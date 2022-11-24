const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addUser: async ({ username, fullname, email, country, password }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
      pr_users(username, fullname, email, country, password)
    VALUES
    (?, ?, ?, ?, ?)`,
        [username, fullname, email, country, password]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  addUserByOauth: async ({
    fullname,
    username,
    email,
    provider,
    providerUserId,
    photo,
  }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_users(fullname, username, email, auth_provider, provider_user_id, photo)
        VALUES
        (?, ?, ?, ?, ?, ?)`,
        [fullname, username, email, provider, providerUserId, photo]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, { username, fullname, email, country, password }) => {
    try {
      const results = await pool.query(
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
        [username, fullname, email, password, country, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getUsers: async ({
    offset,
    rpp,
    where_ = 'status >= 0',
    orderby = 'username ASC',
  }) => {
    try {
      const results = await pool.query(
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
          ${where_}
        ORDER BY
          ${orderby}
        LIMIT
          ?, ?`,
        [offset, rpp]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getUserByUserId: async (id) => {
    try {
      const results = await pool.query(
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
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_users
        SET
          status = ?
        WHERE
          uid = ?`,
        [0, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when logging, to allow user to either login by username or by email
  getUserByUsernameOrByEmail: async (username) => {
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
          isAdmin
        FROM
          pr_users
        WHERE
          (
            email = ?
            OR username = ?
          )
          AND status = ?`,
        [username, username, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getUserByUsernameOrByEmail2: async ({ email, username }) => {
    if (email) {
      try {
        const results = await pool.query(
          `SELECT
            uid
          FROM
            pr_users
          WHERE
            email = ?
          AND status = ?`,
          [email, 1]
        );

        return results[0];
      } catch (error) {
        throw error;
      }
    } else {
      if (username) {
        try {
          const results = await pool.query(
            `SELECT
              uid
            FROM
              pr_users
            WHERE
              username = ?
            AND status = ?`,
            [username, 1]
          );

          return results[0];
        } catch (error) {
          throw error;
        }
      }
    }
  },

  getCurrentUser: async (uid) => {
    try {
      const results = await pool.query(
        `SELECT
          uid
        FROM
          pr_users
        WHERE
          uid = ?
        AND status = ?`,
        [uid, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  checkUserByEmail: async (email) => {
    try {
      const results = await pool.query(
        `SELECT uid, email, fullname, password FROM pr_users WHERE email = ?`,
        [email]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  checkUserById: async (uid) => {
    try {
      const results = await pool.query(
        `SELECT uid, email, password FROM pr_users WHERE uid = ?`,
        [uid]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  userByEmailAndId: async ({ email, uid }) => {
    try {
      const results = await pool.query(
        `SELECT uid, email, password FROM pr_users WHERE uid = ? AND email = ?`,
        [uid, email]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // update password
  updatePassword: async ({ password, uid, email }) => {
    try {
      const results = await pool.query(
        `UPDATE pr_users SET password = ? WHERE uid = ? AND email = ?`,
        [password, uid, email]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getUserByAuthProviderId: async (providerUserId) => {
    try {
      const results = await pool.query(
        `SELECT uid, email, password FROM pr_users WHERE provider_user_id = ?`,
        [providerUserId]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
