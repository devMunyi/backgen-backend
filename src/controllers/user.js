require("dotenv").config();
const {
  addUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsernameOrByEmail,
  getCurrentUser,
  checkUserByEmail,
  checkUserById,
  userByEmailAndId,
  updatePassword,
} = require("../models/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const async = require("async");
const nodemailer = require("nodemailer");

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
    const { username, password } = req.body;
    //console.log("USERNAME => ", username);
    getUserByUsernameOrByEmail(username, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Invalid username",
        });
      }
      const result = compareSync(password, results.password);
      if (result) {
        //console.log(results);
        const { password, ...rest } = results;
        //results.password = undefined;
        const jsontoken = sign({ result: rest }, process.env.JWT_SECRET, {
          expiresIn: "8h",
        });
        return res.json({
          success: true,
          message: "Log in success",
          token: "Bearer " + jsontoken,
          user: rest,
        });
      } else {
        return res.json({
          success: false,
          message: "Incorrect password",
        });
      }
    });
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

  forgotPassword: (req, res) => {
    const { email } = req.body;
    if (!email || email.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    //make sure that user exists in the db
    checkUserByEmail(email, (err, user) => {
      if (err) {
        return console.log(err);
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email not found",
        });
      }

      //user exists now create a one time link valid for 15min
      const secret = process.env.JWT_SECRET + user.password;
      const payload = {
        uid: user.uid,
        email: user.email,
        fullname: user.fullname,
      };

      const token = sign(payload, secret, { expiresIn: "1h" });
      const link = `${process.env.PASSWORD_RESET_URL}?uid=${user.uid}&token=${token}`;
      //console.log(link);

      //send password reset link as mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.APP_EMAIL,
        to: payload.email,
        subject: "Password Reset Link",
        html: `<p><b>Dear ${payload.fullname},</b></p>
        <p>To reset your password, please click <a href='${link}'>here</a> and follow the instructions provided.</p>
        <p>If you have trouble clicking on the link provided, you may copy and paste the following URL into your browser:</p>
        <p>${link}</p>
        <p>This link will expire in 1 hour. If you receive a message stating that the link has expired, please click <a href='${process.env.FORGOT_PASSWORD_URL}'>here</a> to request a new 'password reset' link.</p>
        <p>You may also copy and paste the following URL into your browser to request a new 'password reset' link:</p>
        <p>${process.env.FORGOT_PASSWORD_URL}</p>
        <p>Thank you for using Zidiapp,</p>
        <p>The Zidiapp Team</p>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        } else {
          //console.log("Email sent: " + info.accepted);
          return res.status(200).send({
            success: true,
            message: "Password reset link has been sent to your email...",
          });
        }
      });
    });
  },

  resetPassword: (req, res) => {
    let { uid, token, password, cpassword } = req.body;

    if (!uid || !token) {
      return res.json({
        success: false,
        message: "Invalid password reset token",
      });
    }

    uid = parseInt(uid);

    //make sure that user exists in the db
    checkUserById(uid, (err, user) => {
      if (err) {
        return console.log(err);
      }

      if (!user) {
        return res.json({
          success: false,
          message: "Email not found",
        });
      }

      //we have a valid user with that id
      const secret = process.env.JWT_SECRET + user.password;
      try {
        const payload = verify(token, secret);
        const pUid = payload.uid;
        const pEmail = payload.email;
        //validate password and password2 matches
        if (!password || password.length < 6) {
          return res.json({
            success: false,
            message: "Password is required and should be min 6 characters long",
          });
        } else if (!cpassword) {
          return res.json({
            success: false,
            message: "Confirm password is required",
          });
        } else if (password !== cpassword) {
          return res.json({
            success: false,
            message: "Passwords do not match.",
          });
        } else {
          //find that user with payload id and email exist and update the password
          userByEmailAndId({ uid: pUid, email: pEmail }, (err, resp) => {
            if (err) {
              return console.log(err);
            }

            if (!resp) {
              return res.json({
                success: false,
                message: "Invalid user id",
              });
            }

            if (resp) {
              //hash the password
              const salt = genSaltSync(10);
              user.password = hashSync(password, salt);

              //save the updated passoword
              updatePassword(user, (err, resp2) => {
                if (err) {
                  return console.log(err);
                }

                if (!resp2) {
                  return res.json({
                    success: false,
                    message: "Password update Failed. Please Try Again",
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                    message:
                      "Successful. You can now use your new password to login",
                  });
                }
              });
            }
          });
        }
      } catch (error) {
        res.send({
          success: false,
          message: error.message,
        });
      }
    });
  },
};
