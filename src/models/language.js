const pool = require("../../config/db.config"); //require database configurations for CRUD operations

module.exports = {
  addLanguage: ({ name, description, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO
        pr_languages(name, description, icon, added_by)
      VALUES
      (?, ?, ?, ?)`,
      [name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getLanguages: ({ where_, andsearch, offset, rpp }, callback) => {
    pool.query(
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
        name
      LIMIT
        ?, ?`,
      [offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getTotalRecords: ({ where_, andsearch }, callback) => {
    pool.query(
      `SELECT
        COUNT(uid) AS all_totals
      FROM
        pr_languages
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

  getLanguageByLanguageId: ({ where_, language_id }, callback) => {
    pool.query(
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
      [language_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  updateLanguage: (id, { name, description, icon, added_by }, callback) => {
    pool.query(
      `UPDATE
        pr_languages
      SET
        name = ?,
        description = ?,
        icon = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [name, description, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteLanguage: (id, callback) => {
    pool.query(
      `UPDATE
        pr_languages
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

  reactivateLanguage: (id, callback) => {
    pool.query(
      `UPDATE
        pr_languages
      SET
        status = ?
      WHERE
        uid = ?`,
      [1, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
