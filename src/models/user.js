const pool = require("../../config/db.config"); //require database configurations for CRUD operations

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

  // addUserByGoogle: (
  //   { fullname, username, email, provider, photo },
  //   callback
  // ) => {
  //   pool.query(
  //     `INSERT INTO
  //       pr_users(fullname, username, email, auth_provider, photo)
  //     VALUES
  //     (?, ?, ?, ?, ?)`,
  //     [fullname, username, email, provider, photo],
  //     (error, results, fields) => {
  //       if (error) {
  //         return callback(error);
  //       }
  //       return callback(null, results);
  //     }
  //   );
  // },

  addUserByOauth: (
    { fullname, username, email, provider, providerUserId, photo },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_users(fullname, username, email, auth_provider, provider_user_id, photo)
      VALUES
      (?, ?, ?, ?, ?, ?)`,
      [fullname, username, email, provider, providerUserId, photo],
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
        auth_provider AS 'provider',
        isAdmin
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
        auth_provider AS 'provider',
        isAdmin
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
  getUserByUsernameOrByEmail: (username, callback) => {
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
        isAdmin
      FROM
        pr_users
      WHERE
        (
          email = ?
          OR username = ?
        )
        AND status = ?`,
      [username, username, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  getUserByUsernameOrByEmail2: ({ email, username }, callback) => {
    if (email) {
      pool.query(
        `SELECT
          uid
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
    } else {
      if (username) {
        pool.query(
          `SELECT
            uid
          FROM
            pr_users
          WHERE
            username = ?
          AND status = ?`,
          [username, 1],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            } else {
              return callback(null, results[0]);
            }
          }
        );
      }
    }
  },

  getCurrentUser: (uid, callback) => {
    pool.query(
      `SELECT
        uid
      FROM
        pr_users
      WHERE
        uid = ?
      AND status = ?`,
      [uid, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  checkUserByEmail: (email, callback) => {
    pool.query(
      `SELECT uid, email, fullname, password FROM pr_users WHERE email = ?`,
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

  checkUserById: (uid, callback) => {
    pool.query(
      `SELECT uid, email, password FROM pr_users WHERE uid = ?`,
      [uid],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  userByEmailAndId: ({ email, uid }, callback) => {
    pool.query(
      `SELECT uid, email, password FROM pr_users WHERE uid = ? AND email = ?`,
      [uid, email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //update password
  updatePassword: ({ password, uid, email }, callback) => {
    pool.query(
      `UPDATE pr_users SET password = ? WHERE uid = ? AND email = ?`,
      [password, uid, email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results);
        }
      }
    );
  },

  getUserByAuthProviderId: (providerUserId, callback) => {
    pool.query(
      `SELECT uid, email, password FROM pr_users WHERE provider_user_id = ?`,
      [providerUserId],
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
