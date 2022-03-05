const pool = require("../config/db.config");

module.exports = {
  //used when registering/adding new user, to handle username uniqueness
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

  //Used when editing user details, to handle username uniqueness
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

  //used when registering/adding new user, to handle email uniqueness
  checkUsersByEmail: (email, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE email = ?`,
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

  //used when editing user details, to handle email uniqueness
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

  //used to ensure invalid user id (uid which doesn't exist in the table) is not parsed as param on making request
  checkUserId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE uid = ? AND status = ?`,
      [id, 1],
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
