const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addLanguage: async ({ name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_languages(name, description, icon, added_by)
        VALUES
        (?, ?, ?, ?)`,
        [name, description, icon, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getLanguages: async ({ where_, andsearch, offset, rpp, orderby }) => {
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
          pr_languages
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

  getLanguageByLanguageId: async ({ where_, language_id }) => {
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
          pr_languages
        WHERE
          uid = ?
          AND ${where_}`,
        [language_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateLanguage: async (id, { name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_languages
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

  deleteLanguage: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_languages
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

  reactivateLanguage: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_languages
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
