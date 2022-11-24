// require database configurations for CRUD operations
const pool = require('../../config/db.config');

module.exports = {
  addSubfunc: async ({ func_id, name, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_subfunctions(func_id, name, added_by)
        VALUES
        (?, ?, ?)`,
        [func_id, name, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
  getSubfuncs: async ({ where_, rpp, offset, orderby = 'sf.name' }) => {
    try {
      const results = await pool.query(
        `SELECT
          sf.uid AS 'uid',
          sf.name AS 'name',
          f.name AS 'function_name',
          sf.func_id AS 'function_id',
          sf.added_by AS 'added_by',
          sf.added_at AS 'added_at',
          sf.status AS 'status'
        FROM
          pr_subfunctions sf
          LEFT JOIN pr_functionalities f ON sf.func_id = f.uid
        WHERE
          ${where_}
          AND sf.uid > 0
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

  getSubfuncBySubfuncId: async ({ where_, subfun_id }) => {
    try {
      const results = await pool.query(
        `SELECT
          sf.uid AS 'uid',
          sf.name AS 'name',
          f.name AS 'function_name',
          sf.func_id AS 'function_id',
          sf.added_by AS 'added_by',
          sf.added_at AS 'added_at',
          sf.status AS 'status'
        FROM
          pr_subfunctions sf
          LEFT JOIN pr_functionalities f ON sf.func_id = f.uid
        WHERE
          sf.uid = ?
          AND ${where_}
        LIMIT
          0, 1`,
        [subfun_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateSubfunc: async (id, { func_id, name, added_by }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_subfunctions
        SET
          func_id = ?,
          name = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [func_id, name, added_by, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteSubfunc: async (id) => {
    try {
      const result = await pool.query(
        `UPDATE
          pr_subfunctions
        SET
          status = ?
        WHERE
          uid = ?`,
        [0, id]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  reactivateSubfunc: async (id) => {
    try {
      const result = await pool.query(
        `UPDATE
          pr_subfunctions
        SET
          status = ?
        WHERE
          uid = ?`,
        [1, id]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },
};
