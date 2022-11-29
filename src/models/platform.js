const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addPlatform: async ({ name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_platforms(name, description, icon, added_by)
        VALUES
        (?, ?, ?, ?)`,
        [name, description, icon, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getPlatforms: async ({ where_, andsearch, offset, rpp, orderby }) => {
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
          pr_platforms
        WHERE
          ${where_} ${andsearch}
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

  getTotalRecords: async ({ where_, andsearch }) => {
    try {
      const result = await pool.query(
        `SELECT
          COUNT(uid) AS all_totals
        FROM
          pr_platforms
        WHERE
          ${where_} ${andsearch}`,
        []
      );

      return result[0][0];
    } catch (error) {
      throw error;
    }
  },

  getPlatformByPlatformId: async ({ where_, platform_id }) => {
    try {
      const result = await pool.query(
        `SELECT
          uid,
          name,
          description,
          icon,
          added_by,
          added_at
        FROM
          pr_platforms
        WHERE
          uid = ?
          AND ${where_}`,
        [platform_id]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  updatePlatform: async (id, { name, description, icon, added_by }) => {
    try {
      const result = await pool.query(
        `UPDATE
          pr_platforms
        SET
          name = ?,
          description = ?,
          icon = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [name, description, icon, added_by, id]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  deletePlatform: async (id) => {
    try {
      const result = await pool.query(
        `UPDATE
          pr_platforms
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

  reactivatePlatform: async (id) => {
    try {
      const result = await pool.query(
        `UPDATE
          pr_platforms
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
