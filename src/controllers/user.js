require('dotenv').config();
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
  addUserByOauth,
  getUserByAuthProviderId,
} = require('../models/user'); //user model require
const { genSaltSync, hashSync, compareSync } = require('bcrypt'); //require bcrypt to handle password
const { sign, verify } = require('jsonwebtoken'); //require jwt to handle issuing of access tokens
//const queryString = require("querystring");
const axios = require('axios'); //require axios to handle API call using get, post, delete, put
//const async = require("async");
const nodemailer = require('nodemailer'); //require nodemailer to handle sending emails

// require helper methods
const { inputAvailable } = require('../../helpers/common');

// require helper methods
const {
  getAccessTokenSignup,
  getAccessTokenSignin,
  getGithubUser,
  getGoogleUserSignup,
  getGoogleUserSignin,
} = require('../../helpers/user');

module.exports = {
  getUserByUserId: async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
      return res.json({
        success: false,
        message: 'User id is required',
      });
    }

    try {
      const results = await getUserByUserId(parseInt(user_id));

      return res.json({
        success: true,
        data: results[0],
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  getUsers: async (req, res) => {
    let queryObj = {};

    let { where_, status, search_, orderby, dir, offset, rpp } = req.query;

    if (!status) {
      status = 1;
    }

    if (!where_) {
      where_ = `status = ${status}`;
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND (username LIKE '%${search_}%' OR email LIKE '%${search_}%' OR fullname LIKE '%${search_}%')`;
    }

    if (!orderby) {
      orderby = 'fullname';
    }
    if (!dir) {
      dir = 'ASC';
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    // add data to queryObj object
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    queryObj.where_ = where_;

    try {
      const results = await getUsers(queryObj);

      return res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  updateUser: async (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const { user_id } = req.body;

    try {
      const result = await updateUser(parseInt(user_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record to update not found!',
        });
      }

      return res.json({
        success: true,
        message: 'User updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteUser: async (req, res) => {
    const { user_id } = req.body;

    try {
      const result = await deleteUser(parseInt(user_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'User record to delete not found!',
        });
      }

      return res.json({
        success: true,
        message: 'User deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password: inputPassword } = req.body;
      const results = await getUserByUsernameOrByEmail(username);

      // validate username
      if (results.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid username',
        });
      }

      // validate password
      const isValidPwd = compareSync(inputPassword, results[0].password);

      if (!isValidPwd) {
        return res.json({
          success: false,
          message: 'Incorrect password',
        });
      }

      // separate user password from the rest of user info
      const { password, ...rest } = results[0];

      const jsontoken = sign(rest, process.env.JWT_SECRET, {
        expiresIn: '8h',
      });

      return res.json({
        success: true,
        message: 'Log in success',
        token: 'Bearer ' + jsontoken,
        user: rest,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  currentUser: async (req, res) => {
    const { uid } = req.user;

    try {
      const results = await getCurrentUser(uid);

      if (results.length === 0) {
        return res.json({
          success: false,
          message: 'No record found',
        });
      }

      return res.json({
        success: true,
        sameUser: results[0].uid,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  addUser: async (req, res) => {
    // after input validation using userRegisterValidation middleware try to save the user data
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    try {
      await addUser(body);

      return res.json({
        success: true,
        message: 'User added Successfully. You can now login.',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new user',
      });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    if (!email || email.length < 1) {
      return res.json({
        success: false,
        message: 'Email is required',
      });
    }

    // make sure that user email exists in the db
    try {
      const [user] = await checkUserByEmail(email);

      if (!user) {
        return res.json({
          success: false,
          message: 'Email not found',
        });
      }

      // user exists now create a one time link valid for 15min
      const secret = process.env.JWT_SECRET + user.password;
      const payload = {
        uid: user.uid,
        email: user.email,
        fullname: user.fullname,
      };

      const token = sign(payload, secret, { expiresIn: '1h' });
      const link = `${process.env.PASSWORD_RESET_URL}?uid=${user.uid}&token=${token}`;

      // send password reset link as mail
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_EMAIL_PASS,
        },
      });

      console.log('RECIPIENT => ', payload.email);

      const mailOptions = {
        from: process.env.APP_EMAIL,
        to: payload.email,
        subject: 'Password Reset Link',
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
          console.log(error);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else {
          // console.log("Email sent: " + info.accepted);
          return res.send({
            success: true,
            message: 'Password reset link has been sent to your email...',
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  resetPassword: async (req, res) => {
    let { uid, token, password, cpassword } = req.body;

    if (!uid || !token) {
      return res.json({
        success: false,
        message: 'Invalid password reset token',
      });
    }

    uid = parseInt(uid);

    try {
      // make sure that user exists in the db
      const [user] = await checkUserById(uid);

      if (!user) {
        return res.json({
          success: false,
          message: 'User not found',
        });
      }

      // past above if block we have a valid user with that id
      const secret = process.env.JWT_SECRET + user.password;

      const payload = verify(token, secret);
      const pUid = payload.uid;
      const pEmail = payload.email;

      // validate password and password2 matches
      if (!password || password.length < 6) {
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
      }

      // find that user with payload id and email exist and update the password
      const userFindResponse = await userByEmailAndId({
        uid: pUid,
        email: pEmail,
      });

      // handle no user response
      if (userFindResponse.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid user id or email',
        });
      }

      // finally handle user available reponse
      // hash the password
      const salt = genSaltSync(10);
      user.password = hashSync(password, salt);
      // save the updated passoword
      await updatePassword(user);

      // send success reponse
      return res.json({
        success: true,
        message: 'Successful. You can now use your new password to login',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  googleOAuthSignin: async (req, res) => {
    const { code } = req.query;

    const googleUser = await getGoogleUserSignin(code);

    let username = '';
    let { email } = googleUser;
    let fullname = googleUser.name;
    let photo = googleUser.picture;
    let provider = 'Google';
    let providerUserId = googleUser.id;

    let user = { username, email, fullname, photo, provider, providerUserId };

    try {
      const result = await getUserByAuthProviderId(providerUserId);

      if (result.length === 0) {
        // redirect user back to login with success false
        return res.redirect(
          process.env.SIGNIN_CLIENT_URL +
            '?success=' +
            false +
            '&message=' +
            'Sign in Error. Please Sign up with Google First' +
            '&provider=' +
            provider +
            '&providerUserId=' +
            providerUserId
        );
      }

      user.uid = result[0].uid;

      // successful login
      // generate token to track user later
      const token = sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });

      // redirect user back to login page with a success token
      return res.redirect(
        process.env.SIGNIN_CLIENT_URL +
          '?success=' +
          true +
          '&tkn=' +
          token +
          '&uid=' +
          user.uid +
          '&username=' +
          username +
          '&fullname=' +
          fullname +
          '&email=' +
          email +
          '&photo=' +
          photo +
          '&provider=' +
          provider +
          '&providerUserId=' +
          providerUserId
      );
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  googleOAuthSignup: async (req, res) => {
    const { code } = req.query;

    const googleUser = await getGoogleUserSignup(code);

    let username = '';
    let { email } = googleUser;
    let fullname = googleUser.name;
    let photo = googleUser.picture;
    let provider = 'Google';
    let providerUserId = googleUser.id;

    let user = { username, email, fullname, photo, provider, providerUserId };

    try {
      const result = await getUserByAuthProviderId(providerUserId);

      // its a new user store info
      if (result.length === 0) {
        await addUserByOauth(user);

        return res.redirect(
          process.env.SIGNUP_CLIENT_URL +
            '?success=' +
            true +
            '&message=' +
            'Sign up success' +
            '&provider=' +
            provider +
            '&providerUserId=' +
            providerUserId
        );
      }

      // past above if block, means similar user exists,
      // redirect user to login with google instead
      return res.redirect(
        process.env.SIGNUP_CLIENT_URL +
          '?success=' +
          false +
          '&message=' +
          'Google Account Already Exists. Sign in with Google Instead' +
          '&provider=' +
          provider +
          '&providerUserId=' +
          providerUserId
      );
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  githubOAuthSignin: async (req, res) => {
    const { code } = req.query;

    const accessToken = await getAccessTokenSignin(code);
    const githubUser = await getGithubUser(accessToken);

    let username = githubUser.login;
    let fullname = githubUser.name;
    let email = githubUser.email;
    let photo = githubUser.avatar_url;
    let provider = 'Github';
    let providerUserId = githubUser.id;

    let user = {
      username,
      fullname,
      email,
      photo,
      provider,
      providerUserId,
    };

    try {
      // user check from db
      const result = await getUserByAuthProviderId(providerUserId);

      // handle case when user doesn't exist
      if (result.length === 0) {
        // redirect user back to login with success false
        return res.redirect(
          process.env.SIGNIN_CLIENT_URL +
            '?success=' +
            false +
            '&message=' +
            'Sign in Error. Please Sign up with Github First' +
            '&provider=' +
            provider +
            '&providerUserId' +
            providerUserId
        );
      }

      // past above if block means user exist in the db

      user.uid = result[0].uid;

      // generate token to track user later
      const token = sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });

      // redirect user back to login page with a success token
      return res.redirect(
        process.env.SIGNIN_CLIENT_URL +
          '?success=' +
          true +
          '&tkn=' +
          token +
          '&uid=' +
          user.uid +
          '&username=' +
          username +
          '&fullname=' +
          fullname +
          '&email=' +
          email +
          '&photo=' +
          photo +
          '&provider=' +
          provider +
          '&providerUserId = ' +
          providerUserId
      );
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }

    // // reusable function to get exchange code with access token from github
    // async function getAccessToken(code) {
    //   const { data } = await axios({
    //     method: 'post',
    //     url:
    //       'https://github.com/login/oauth/access_token?' +
    //       `client_id=${process.env.SIGNIN_GITHUB_CLIENT_ID}&` +
    //       `client_secret=${process.env.SIGNIN_GITHUB_CLIENT_SECRET}&` +
    //       `code=${code}`,
    //     headers: {
    //       accept: 'application/json',
    //     },
    //   });

    //   return data.access_token;
    // }

    // // reusable function to exchange user info with access token
    // async function getGithubUser(accessToken) {
    //   const { data } = await axios({
    //     method: 'get',
    //     url: `https://api.github.com/user`,
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: `token ${accessToken}`,
    //     },
    //   });

    //   return data;
    // }
  },

  githubOAuthSignup: async (req, res) => {
    const { code } = req.query;

    const accessToken = await getAccessTokenSignup(code);
    const githubUser = await getGithubUser(accessToken);

    let username = githubUser.login;
    let fullname = githubUser.name;
    let email = githubUser.email;
    let photo = githubUser.avatar_url;
    let provider = 'Github';
    let providerUserId = githubUser.id;

    let user = {
      username,
      fullname,
      email,
      photo,
      provider,
      providerUserId,
    };

    try {
      // check user from db
      const result = await getUserByAuthProviderId(providerUserId);

      // handle case when user dosen't exist in db
      if (result.length === 0) {
        // store user info
        await addUserByOauth(user);

        return res.redirect(
          process.env.SIGNUP_CLIENT_URL +
            '?success=' +
            true +
            '&message=' +
            'Sign up success' +
            '&provider=' +
            provider
        );
      }

      // past above if block means, a similar user exists,
      // redirect user to login with github instead
      return res.redirect(
        process.env.SIGNUP_CLIENT_URL +
          '?success=' +
          false +
          '&message=' +
          'Github Account Already Exists. Sign in with Github Instead' +
          '&provider=' +
          provider +
          '&providerUserId' +
          providerUserId
      );
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },
};
