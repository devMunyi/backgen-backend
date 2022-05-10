require("dotenv").config();
const { verify } = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { compareSync } = require("bcrypt");
const secret = process.env.JWT_SECRET;
const {
  checkIfSimilarUsernameExist,
  checkIfSimilarEmailExist,
  checkUsersByEmail,
  checkUsersByUsername,
  getUserByUsernameOrByEmail,
} = require("../helpers/user");

module.exports = {
  //use either requireSignin or checkToken to validate token
  requireSignin: expressJWT({
    secret,
    algorithms: ["HS256"],
  }),

  //validate token
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, secret, (err, decoded) => {
        //console.log(decoded);
        if (err) {
          res.json({
            success: false,
            message: "Invalid token, please login.",
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: "Access denied! unauthorized user",
      });
    }
  },

  //email validation middleware
  emailValidation: (req, res, next) => {
    let { email } = req.body;
    email = email.trim();

    if (!email || email.length < 1) {
      return res.send({
        success: false,
        message: "Email is required",
      });
    }

    //check if the email exist in the database
    checkUsersByEmail(email, (err, result) => {
      if (err) {
        return console.log(err);
      } else if (!result) {
        return res.json({
          success: false,
          message: "User email not registered",
        });
      } else {
        req.body.email = email;
        next();
      }
    });
  },

  userRegisterValidation: (req, res, next) => {
    let { username, fullname, email, country, password, cpassword } = req.body;

    username = username.trim();
    fullname = fullname.trim();
    email = email.trim();
    country = parseInt(country);
    password = password.trim();
    cpassword = cpassword.trim();

    if (!username || username.length < 1) {
      return res.json({
        success: false,
        message: "Username is required",
      });
    } else if (!fullname || fullname.length < 5) {
      return res.json({
        success: false,
        message: "Fullname is required and should be min 5 characters",
      });
    } else if (!email || email.length < 5) {
      return res.json({
        success: false,
        message: "Valid Email is required",
      });
    } else if (!country || country < 1) {
      return res.json({
        success: false,
        message: "Country is required",
      });
    } else if (!password || password.length < 6) {
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
    } else if (username.length > 0) {
      checkUsersByUsername(username, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.json({
            success: false,
            message: "Username already taken",
          });
        } else {
          if (email.length > 0) {
            checkUsersByEmail(email, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else if (result) {
                return res.json({
                  success: false,
                  message: "Email already taken",
                });
              } else {
                req.body.username = username;
                req.body.email = email;
                req.body.password = password;
                req.body.cpassword = cpassword;
                next();
              }
            });
          }
        }
      });
    }
  },

  userEditValidation: (req, res, next) => {
    let { username, fullname, email, country, password, cpassword, user_id } =
      req.body;

    username = username.trim();
    fullname = fullname.trim();
    email = email.trim();
    country = parseInt(country);
    password = password.trim();
    cpassword = cpassword.trim();

    userid = parseInt(user_id);
    //console.log(userid);
    if (!username || username.length < 1) {
      return res.json({
        success: false,
        message: "Username is required",
      });
    } else if (!fullname || fullname.length < 5) {
      return res.json({
        success: false,
        message: "Fullname is required and should be min 5 characters",
      });
    } else if (!email || email.length < 3) {
      return res.json({
        success: false,
        message: "Valid Email is required",
      });
    } else if (!country || country < 1) {
      return res.json({
        success: false,
        message: "Country is required",
      });
    } else if (!password || password.length < 6) {
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
    } else if (username.length > 0) {
      checkIfSimilarUsernameExist(username, userid, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.json({
            success: false,
            message: "Username already taken",
          });
        } else if (username.length > 0) {
          checkIfSimilarEmailExist(email, userid, (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else if (result) {
              return res.json({
                success: false,
                message: "Email already taken",
              });
            } else {
              req.body.username = username;
              req.body.email = email;
              req.body.password = password;
              req.body.cpassword = cpassword;
              next();
            }
          });
        }
      });
    }
  },

  validateUserLogin: (req, res, next) => {
    let { username, password } = req.body;
    //console.log("REQUEST BODY => ", req.body);
    if (username.length < 1) {
      return res.send({
        success: false,
        message: "Username is required",
      });
    } else if (password.length < 1) {
      return res.send({
        success: false,
        message: "Password is required",
      });
    } else {
      getUserByUsernameOrByEmail(username, (err, user) => {
        if (err) {
          return console.log(err); //when some errors occur
        }
        if (!user) {
          return res.json({
            success: false,
            message: "Invalid username",
          });
        }
        //invalid password
        if (!compareSync(password, user.password)) {
          return res.json({
            success: false,
            message: "Incorrect password",
          });
        } else {
          let { password, ...rest } = user;
          user = rest;
          req.user = user;
          next();
        }
      });
    }
  },
};
