const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addFramework: async ({ language_id, name, description, icon, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_frameworks(language_id, name, description, icon, added_by)
        VALUES
        (?, ?, ?, ?, ?)`,
        [language_id, name, description, icon, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getFrameworks: async ({
    language_id,
    where_,
    offset,
    rpp,
    orderby = 'f.name ASC',
  }) => {
    if (language_id) {
      try {
        const results = await pool.query(
          `SELECT
            f.uid AS 'uid',
            f.name AS 'name',
            l.name AS 'language',
            f.language_id AS 'language_id',
            f.description AS 'description',
            f.icon AS 'icon',
            f.status AS 'status'
          FROM
            pr_frameworks f
            LEFT JOIN pr_languages l ON f.language_id = l.uid
          WHERE
            f.language_id = ?
            AND ${where_}
          ORDER BY
            ${orderby}
          LIMIT
            ?, ?`,
          [language_id, offset, rpp]
        );

        return results[0];
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const results = await pool.query(
          `SELECT
            f.uid AS 'uid',
            f.name AS 'name',
            l.name AS 'language',
            f.language_id AS 'language_id',
            f.description AS 'description',
            f.icon AS 'icon',
            f.status AS 'status'
          FROM
            pr_frameworks f
            LEFT JOIN pr_languages l ON f.language_id = l.uid
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
    }
  },

  getFrameworkByFrameworkId: async ({ where_, framework_id }) => {
    try {
      const results = await pool.query(
        `SELECT
          f.uid AS 'uid',
          f.name AS 'name',
          l.name AS 'language',
          f.language_id AS 'language_id',
          f.description AS 'description',
          f.icon AS 'icon',
          f.added_by AS 'added_by',
          f.added_at AS 'added_at',
          f.status AS 'status'
        FROM
          pr_frameworks f
          LEFT JOIN pr_languages l ON f.language_id = l.uid
        WHERE
          f.uid = ?
          AND ${where_}`,
        [framework_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateFramework: async (
    id,
    { language_id, name, description, icon, added_by }
  ) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_frameworks
        SET
          language_id = ?,
          name = ?,
          description = ?,
          icon = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [language_id, name, description, icon, added_by, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteFramework: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_frameworks
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

  reactivateFramework: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_frameworks
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
