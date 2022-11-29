require('dotenv').config();
const pool = require('../config/db.config');
const axios = require('axios');
const { google } = require('googleapis'); //require googleapis to handle google OUATH
// google oauth sign in options
const oauth2ClientSignin = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SIGNIN_GOOGLE_CALLBACK_URL
);

//google oauth sign up options
const oauth2ClientSignup = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SIGNUP_GOOGLE_CALLBACK_URL
);

module.exports = {
  // Get user by username from database by username
  checkUsersByUsername: async (username) => {
    const results = await pool.query(
      `SELECT uid FROM pr_users WHERE username = ? AND auth_provider = 'Local'`,
      [username]
    );

    return results[0];
  },

  // get user from database by username and id when updating
  checkIfSimilarUsernameExist: async (username, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_users WHERE username = ? AND uid != ? AND auth_provider = 'Local'`,
        [username, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // retrieve user from database by email
  checkUsersByEmail: async (email) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_users WHERE email = ? AND status = 1 AND auth_provider = 'Local'`,
        [email]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  //retrieve user by email and id
  checkIfSimilarEmailExist: async (email, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_users WHERE email = ? AND uid != ? AND auth_provider = 'Local'`,
        [email, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when logging, to allow user to either login by username or by email
  getUserByUsernameOrByEmail: async (emailOrUsername) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          username,
          fullname,
          email,
          photo,
          country,
          password,
          auth_provider AS 'provider',
          status
        FROM
          pr_users
        WHERE
          (
            email = ?
            OR username = ?
          )
          AND status = ?`,
        [emailOrUsername, emailOrUsername, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // resusable function to exchange code with access token from github
  // when user is using github to sign in or login
  getAccessTokenSignin: async (code) => {
    try {
      const { data } = await axios({
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${process.env.SIGNIN_GITHUB_CLIENT_ID}&` +
          `client_secret=${process.env.SIGNIN_GITHUB_CLIENT_SECRET}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json',
        },
      });

      return data.access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // resusable function to exchange code with access token from github
  // when user is using github to sign up or register
  getAccessTokenSignup: async (code) => {
    try {
      const { data } = await axios({
        method: 'post',
        url:
          'https://github.com/login/oauth/access_token?' +
          `client_id=${process.env.SIGNUP_GITHUB_CLIENT_ID}&` +
          `client_secret=${process.env.SIGNUP_GITHUB_CLIENT_SECRET}&` +
          `code=${code}`,
        headers: {
          accept: 'application/json',
        },
      });

      return data.access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // reusable function to exchange user info with access token from Github
  // applicable for both when user want to sign in and sign up with Github
  getGithubUser: async (accessToken) => {
    try {
      const { data } = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          accept: 'application/json',
          Authorization: `token ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // reusable function to get user using code when user waant to sign up (register) with google
  getGoogleUserSignup: async (code) => {
    const { tokens } = await oauth2ClientSignup.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error.message);
      });

    return googleUser;
  },

  // reusable function to get user using code when user waant to sign in (login)) with google
  getGoogleUserSignin: async (code) => {
    const { tokens } = await oauth2ClientSignin.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error.message);
      });

    return googleUser;
  },
};
