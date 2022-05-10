const pool = require("../config/db.config");

module.exports = {
  //Get user by username from database by username
  checkUsersByUsername: (username, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE username = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //Get user from database by username and id when updating
  checkIfSimilarUsernameExist: (username, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE username = ? AND uid != ?`,
      [username, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //retrieve user from database by email
  checkUsersByEmail: (email, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE email = ? AND status = 1`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //retrieve user by email and id
  checkIfSimilarEmailExist: (email, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE email = ? AND uid != ?`,
      [email, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //used when logging, to allow user to either login by username or by email
  getUserByUsernameOrByEmail: (emailOrUsername, callback) => {
    pool.query(
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
      [emailOrUsername, emailOrUsername, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },
};
