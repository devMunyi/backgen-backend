require('dotenv').config();
const { verify } = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { compareSync } = require('bcrypt');
const secret = process.env.JWT_SECRET;
const {
  checkIfSimilarUsernameExist,
  checkIfSimilarEmailExist,
  checkUsersByEmail,
  checkUsersByUsername,
  getUserByUsernameOrByEmail,
} = require('../helpers/user');

module.exports = {
  //use either requireSignin or checkToken to validate token
  requireSignin: expressJWT({
    secret,
    algorithms: ['HS256'],
  }),

  //validate token
  checkToken: (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
      token = token.slice(7);
      verify(token, secret, (err, decoded) => {
        //console.log(decoded);
        if (err) {
          res.json({
            success: false,
            message: 'Invalid token, please login.',
          });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Access denied! unauthorized user',
      });
    }
  },

  // email validation middleware
  emailValidation: async (req, res, next) => {
    let { email } = req.body;
    email = email?.trim();

    if (!email || email.length < 1) {
      return res.send({
        success: false,
        message: 'Email is required',
      });
    }

    // check if the email exist in the database
    try {
      const result = await checkUsersByEmail(email);

      if (result.length === 0) {
        return res.json({
          success: false,
          message: 'User email not registered',
        });
      }

      req.body.email = email;

      next();
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  userRegisterValidation: async (req, res, next) => {
    let { username, fullname, email, country, password, cpassword } = req.body;

    username = username?.trim();

    fullname = fullname?.trim();

    email = email?.trim();

    country = parseInt(country);

    password = password?.trim();

    cpassword = cpassword?.trim();

    if (!username || username.length < 1) {
      return res.json({
        success: false,
        message: 'Username is required',
      });
    } else if (!fullname || fullname.length < 5) {
      return res.json({
        success: false,
        message: 'Fullname is required and should be min 5 characters',
      });
    } else if (!email || email.length < 5) {
      return res.json({
        success: false,
        message: 'Valid Email is required',
      });
    } else if (!country || country < 1) {
      return res.json({
        success: false,
        message: 'Country is required',
      });
    } else if (!password || password.length < 6) {
      return res.json({
        success: false,
        message: 'Password is required and should be min 6 characters long',
      });
    } else if (!cpassword) {
      return res.json({
        success: false,
        message: 'Confirm password is required',
      });
    } else if (password !== cpassword) {
      return res.json({
        success: false,
        message: 'Passwords do not match.',
      });
    } else if (username.length > 0) {
      try {
        const usernameResult = await checkUsersByUsername(username);

        if (usernameResult.length) {
          return res.json({
            success: false,
            message: 'Username already taken',
          });
        }

        const emailEmail = await checkUsersByEmail(email);

        if (emailEmail.length) {
          return res.json({
            success: false,
            message: 'Email already taken',
          });
        }

        req.body.username = username;

        req.body.email = email;

        req.body.password = password;

        req.body.cpassword = cpassword;

        next();
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
    }
  },

  userEditValidation: async (req, res, next) => {
    let { username, fullname, email, country, password, cpassword, user_id } =
      req.body;

    username = username?.trim();
    fullname = fullname?.trim();
    email = email?.trim();
    country = parseInt(country);
    password = password?.trim();
    cpassword = cpassword?.trim();
    user_id = parseInt(user_id);

    if (!username || username.length < 1) {
      return res.json({
        success: false,
        message: 'Username is required',
      });
    } else if (!fullname || fullname.length < 5) {
      return res.json({
        success: false,
        message: 'Fullname is required and should be min 5 characters',
      });
    } else if (!email || email.length < 3) {
      return res.json({
        success: false,
        message: 'Valid Email is required',
      });
    } else if (!country || country < 1) {
      return res.json({
        success: false,
        message: 'Country is required',
      });
    } else if (!password || password.length < 6) {
      return res.json({
        success: false,
        message: 'Password is required and should be min 6 characters long',
      });
    } else if (!cpassword) {
      return res.json({
        success: false,
        message: 'Confirm password is required',
      });
    } else if (password !== cpassword) {
      return res.json({
        success: false,
        message: 'Passwords do not match.',
      });
    } else if (username.length > 0) {
      try {
        const usernameCheckResult = await checkIfSimilarUsernameExist(
          username,
          user_id
        );

        if (usernameCheckResult.length) {
          return res.json({
            success: false,
            message: 'Username already taken',
          });
        }

        const emailCheckResult = await checkIfSimilarEmailExist(email, user_id);

        if (emailCheckResult.length) {
          return res.json({
            success: false,
            message: 'Email already taken',
          });
        }

        req.body.username = username;
        req.body.email = email;
        req.body.password = password;
        req.body.cpassword = cpassword;

        next();
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
    }
  },

  validateUserLogin: async (req, res, next) => {
    let { username, password } = req.body;

    if (username.length < 1) {
      return res.send({
        success: false,
        message: 'Username is required',
      });
    } else if (password.length < 1) {
      return res.send({
        success: false,
        message: 'Password is required',
      });
    } else {
      //

      try {
        const user = await getUserByUsernameOrByEmail(username);

        if (user.length === 0) {
          return res.json({
            success: false,
            message: 'Invalid username',
          });
        }

        // validate password
        if (!compareSync(password, user[0].password)) {
          return res.json({
            success: false,
            message: 'Incorrect password',
          });
        } else {
          let { password, ...rest } = user[0];
          user = rest;
          req.user = user;

          next();
        }
      } catch (error) {
        console.log(error); // when some errors occur
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
    }
  },
};
