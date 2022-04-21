const pool = require("../../config/db.config");

module.exports = {
  addUser: ({ username, fullname, email, country, password }, callback) => {
    pool.query(
      `INSERT INTO
        pr_users(username, fullname, email, country, password)
      VALUES
      (?, ?, ?, ?, ?)`,
      [username, fullname, email, country, password],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  addUserByGoogle: (
    { fullname, email, social_login_provider, photo },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_users(fullname, email, social_login_provider, photo)
      VALUES
      (?, ?, ?, ?)`,
      [fullname, email, social_login_provider, photo],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateUser: (
    id,
    { username, fullname, email, country, password },
    callback
  ) => {
    pool.query(
      `UPDATE
        pr_users
      SET
        username = ?,
        fullname =?,
        email = ?,
        password = ?,
        country = ?
      WHERE
        uid = ?`,
      [username, fullname, email, password, country, id],
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
      `SELECT
        uid,
        username,
        fullname,
        email,
        country,
        join_date
      FROM
        pr_users
      WHERE
        status = ?
      ORDER BY
        username ASC
      LIMIT
        ?, ?`,
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
      `SELECT
        uid,
        username,
        fullname,
        email,
        country,
        join_date
      FROM
        pr_users
      WHERE
        uid = ?
        AND status = ?`,
      [id, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  deleteUser: (id, callback) => {
    pool.query(
      `UPDATE
        pr_users
      SET
        status = ?
      WHERE
        uid = ?`,
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
      `SELECT
        uid,
        username,
        fullname,
        country,
        email,
        password,
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

  getCurrentUser: ({ email }, callback) => {
    pool.query(
      `SELECT
        uid,
        email
      FROM
        pr_users
      WHERE
        email = ?
      AND status = ?`,
      [email, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  checkUserByEmail: (email, social_login_provider, callback) => {
    pool.query(
      `SELECT uid FROM pr_users WHERE email = ? AND social_login_provider = ?`,
      [email, social_login_provider],
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
