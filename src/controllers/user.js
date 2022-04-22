require("dotenv").config();
const axios = require("axios");
const {
  addUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsernameOrByEmail,
  getCurrentUser,
  checkUserByEmail,
  addUserByGoogle,
} = require("../models/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const async = require("async");

//Google Auth
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "545549745917-bt32oena9mo7ankcbcqpg2thpc6kigdm.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
//const { nanoid } = require("nanoid"); //use it to generate random username

module.exports = {
  getUserByUserId: (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return;
    }

    getUserByUserId(parseInt(user_id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not found",
        });
      }
      return res.json({
        success: false,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    //console.log(req.user);
    let queryObj = {};

    let { status, orderby, dir, offset, rpp } = req.body;

    if (!status) {
      status = 1;
    }
    if (!orderby) {
      orderby = "username";
    }
    if (!dir) {
      dir = "ASC";
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    //add data to queryObj object
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getUsers(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const { user_id } = req.body;

    updateUser(parseInt(user_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update user",
        });
      }

      return res.json({
        success: true,
        message: "User updated successfully!",
      });
    });
  },

  deleteUser: (req, res) => {
    const { user_id } = req.body;
    deleteUser(parseInt(user_id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      }
      console.log(results);
      return res.json({
        success: true,
        message: "User deleted successfully!",
      });
    });
  },

  loginUser: (req, res) => {
    const { body } = req;
    getUserByUsernameOrByEmail(body.emailOrUsername, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Invalid email, username or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        //console.log(results);
        const { password, ...rest } = results;
        //results.password = undefined;
        const jsontoken = sign({ result: rest }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        return res.json({
          success: true,
          message:
            "Logged in successfully. We are redirecting you back to home page",
          token: jsontoken,
          user: rest,
        });
      } else {
        return res.json({
          success: false,
          message: "Invalid email, username or password",
        });
      }
    });
  },

  googleAuth: (req, res) => {
    let { token } = req.body;
    //console.log("RECEIVED TOKEN =>", token);

    let user = {}; //initialize empty object that will store fetched user info
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      //const userid = payload["sub"];
      user.fullname = payload.name;
      user.email = payload.email;
      user.photo = payload.picture;
      user.social_login_provider = "Google";
      user.photo = payload.picture;
    }
    verify()
      .then(() => {
        async.parallel(
          {
            task1: function (callback) {
              setTimeout(function () {
                checkUserByEmail(user.email, "Google", (err, result) => {
                  if (err) {
                    console.log(err);
                  }

                  if (result) {
                    user.uid = result.uid;
                  }

                  if (!result) {
                    //save user info to db
                    addUserByGoogle(user, (err, results) => {
                      if (err) {
                        console.log(err);
                        return res.status(500).json({
                          success: false,
                          message:
                            "Error occured during sign in. Please try again",
                        });
                      }
                      if (!results) {
                        return res.status(500).json({
                          success: false,
                          message:
                            "Error occured during sign in. Please try again",
                        });
                      } else {
                        user.uid = results.insertId;
                      }
                    });
                  }
                });
                callback(null, user);
              }, 50);
            },
            task2: function (callback) {
              setTimeout(function () {
                console.log("Task Two");
                callback(null, 2);
              }, 100);
            },
          },
          function (err, results) {
            //console.log("FINAL USER DETAILS =>", results.task1);
            const jsontoken = sign(
              { result: results.task1 },
              process.env.JWT_SECRET,
              {
                expiresIn: "8h",
              }
            );

            return res.json({
              success: true,
              message:
                "Logged in successfully. We are redirecting you back to home page",
              token: jsontoken,
              user,
            });
          }
        );

        // //check if the user details had been previously saved
        // checkUserByEmail(user.email, "Google", (err, result) => {
        //   console.log("USER EMAIl =>", user.email);
        //   if (err) {
        //     console.log(err);
        //   }

        //   if (result) {
        //     //console.log("USER GOOGLE SIGNED SEARCHED ID =>", result);
        //     user.uid = result.uid;
        //     // console.log("USER ID =>", result.uid);
        //     // console.log("USER WITH ID =>", user);
        //   }

        //   if (!result) {
        //     //save user info to db
        //     addUserByGoogle(user, (err, results) => {
        //       if (err) {
        //         console.log(err);
        //         return res.status(500).json({
        //           success: false,
        //           message: "Error occured during sign in. Please try again",
        //         });
        //       }
        //       if (!results) {
        //         return res.status(500).json({
        //           success: false,
        //           message: "Error occured during sign in. Please try again",
        //         });
        //       } else {
        //         user.uid = results.insertId;
        //       }
        //     });
        //   }
        // });

        // console.log("USER DETAILS =>", user);
        // const jsontoken = sign({ result: user }, process.env.JWT_SECRET, {
        //   expiresIn: "8h",
        // });

        // return res.json({
        //   success: true,
        //   message:
        //     "Logged in successfully. We are redirecting you back to home page",
        //   token: jsontoken,
        //   user,
        // });

        //res.cookie("session-token", token);
        //res.send("success");
      })
      .catch(console.error);
  },

  currentUser: (req, res) => {
    const { result } = req.user;
    //const { country, ...rest } = result;
    //console.log(rest);

    getCurrentUser(result, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No recod found",
        });
      }
      if (results) {
        return res.json({
          success: true,
          sameUser: results,
        });
      }
    });
  },

  gitOauth: (req, res) => {
    axios({
      method: "POST",
      url: `${process.env.GTHB_URL}?client_id=${process.env.GTHB_SECRET_ID}&client_secret=${process.env.GTHB_CLIENT_SECRETS}&code=${req.query.code}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      res.redirect(
        `http://localhost?access_token=${response.data.access_token}`
      );
    });
  },

  addUser: (req, res) => {
    //After input validation using userRegisterValidation middleware try to save the user data
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    addUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new user",
        });
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new user",
        });
      } else {
        return res.json({
          success: true,
          data: results,
          message: "User added Successfully. You can now login.",
        });
      }
    });
  },
};
