const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addFunc: async ({ name, icon, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_functionalities(name, icon, added_by)
        VALUES
        (?, ?, ?)`,
        [name, icon, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getFuncs: async ({ where_, offset, rpp, orderby = 'name ASC' }, callback) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          icon,
          added_at,
          added_by,
          updated_at,
          status
        FROM
          pr_functionalities
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

  getTotalRecords: async ({ where_ }, callback) => {
    pool.query(
      `SELECT
        COUNT(uid) AS all_totals
      FROM
        pr_functionalities
      WHERE
        ${where_} ${andsearch}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getFuncByFuncId: async ({ where_, func_id }) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          icon,
          added_by,
          added_at,
          updated_at,
          status
        FROM
          pr_functionalities
        WHERE
          uid = ?
          AND ${where_}`,
        [func_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateFunc: async (id, { name, icon, added_by }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_functionalities
        SET
          name = ?,
          icon = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [name, icon, added_by, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteFunc: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_functionalities
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

  reactivateFunc: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_functionalities
        SET
          status = ?
        WHERE
          uid = ?`,
        [1, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
