const pool = require("../../config/db.config");

module.exports = {
  addUser: ({ username, email, country, password }, callback) => {
    pool.query(
      `INSERT INTO pr_users(username, email, country, password) VALUES(?, ?, ?, ?)`,
      [username, email, country, password],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUsers: ({ status, offset, rpp }, callback) => {
    pool.query(
      `SELECT uid, username, email, country, join_date FROM pr_users WHERE status = ? ORDER BY username ASC LIMIT ?,?`,
      [status, offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserByUserId: (id, callback) => {
    pool.query(
      `SELECT uid, username, email, country, join_date FROM pr_users WHERE uid = ? AND status = ?`,
      [id, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateUser: (id, { username, email, country, password }, callback) => {
    pool.query(
      `UPDATE pr_users SET username=?, email=?, password=?, country=? WHERE uid =?`,
      [username, email, password, country, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteUser: (id, callback) => {
    pool.query(
      `UPDATE pr_users SET status = ? WHERE uid = ?`,
      [0, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  //used when logging, to allow user to either login by username or by email
  getUserByUsernameOrByEmail: (emailOrUsername, callback) => {
    pool.query(
      `SELECT uid, username, country, email, password, status FROM pr_users WHERE (email = ? OR username = ?) AND status = ?`,
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

  getCurrentUser: ({ uid, username, email, status }, callback) => {
    pool.query(
      `SELECT uid, username, email FROM pr_users WHERE uid = ? AND username = ? AND email = ? AND status = ?`,
      [parseInt(uid), username, email, parseInt(status)],
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
