require("dotenv").config();
const { verify } = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const secret = process.env.JWT_SECRET;
const {
  checkIfSimilarUsernameExist,
  checkIfSimilarEmailExist,
  checkUsersByEmail,
  checkUserId,
  checkUsersByUsername,
} = require("../helpers/user");

module.exports = {
  //use either requireSignin or checkToken to validate token
  requireSignin: expressJWT({
    secret,
    algorithms: ["HS256"],
  }),

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

  userRegisterValidation: (req, res, next) => {
    const { username, email, country, password, cpassword } = req.body;
    if (!username || username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username is required and should be min 3 characters",
      });
    } else if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    } else if (!country) {
      return res.status(400).json({
        success: false,
        message: "Country is required",
      });
    } else if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is required and should be min 6 characters long",
      });
    } else if (!cpassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm password is required",
      });
    } else if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    } else if (username.length > 0) {
      checkUsersByUsername(username, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.status(400).json({
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
                return res.status(400).json({
                  success: false,
                  message: "Email already taken",
                });
              } else {
                next();
              }
            });
          }
        }
      });
    }
  },

  userEditValidation: (req, res, next) => {
    const { username, email, country, password, cpassword } = req.body;
    const userid = parseInt(req.params.id);
    //console.log(userid);
    if (!username || username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username is required and should be min 3 characters",
      });
    } else if (!email) {
      return res.json({
        success: false,
        message: "Email is required",
      });
    } else if (!country) {
      return res.status(400).json({
        success: false,
        message: "Country is required",
      });
    } else if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is required and should be min 6 characters long",
      });
    } else if (!cpassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm password is required",
      });
    } else if (password !== cpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    } else if (username.length > 0) {
      checkIfSimilarUsernameExist(username, userid, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.status(400).json({
            success: false,
            message: "Username already taken",
          });
        } else if (username.length > 0) {
          checkIfSimilarEmailExist(email, userid, (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else if (result) {
              return res.status(400).json({
                success: false,
                message: "Email already taken",
              });
            } else {
              next();
            }
          });
        }
      });
    }
  },

  userIdValidation: (req, res, next) => {
    const userid = parseInt(req.params.id);
    checkUserId(userid, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.status(400).json({
          success: false,
          message: "Invalid User id",
        });
      } else {
        next();
      }
    });
  },
};
