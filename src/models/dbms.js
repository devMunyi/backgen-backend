const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addDbms: async ({ name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_dbms(name, description, icon, added_by)
        VALUES
        (?, ?, ?, ?)`,
        [name, description, icon, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getDbmses: async ({ where_, offset, rpp, orderby }) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          description,
          icon,
          added_by,
          added_at,
          status
        FROM
          pr_dbms
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

  getDbmsByDbmsId: async ({ where_, dbms_id }) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          description,
          icon,
          added_by,
          added_at,
          status
        FROM
          pr_dbms
        WHERE
          uid = ?
          AND ${where_}`,
        [dbms_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateDbms: async (id, { name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_dbms
        SET
          name = ?,
          description = ?,
          icon = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [name, description, icon, added_by, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteDbms: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_dbms
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

  reactivateDbms: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_dbms
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
