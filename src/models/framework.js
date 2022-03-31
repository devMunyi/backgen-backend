const pool = require("../../config/db.config");

module.exports = {
  addFramework: (
    { language_id, name, description, icon, added_by },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_frameworks(language_id, name, description, icon, added_by)
      VALUES
      (?, ?, ?, ?, ?)`,
      [language_id, name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getFrameworks: (
    { language_id, where_, andsearch, offset, rpp },
    callback
  ) => {
    if (language_id) {
      pool.query(
        `SELECT
          f.uid AS 'uid',
          f.name AS 'name',
          l.name AS 'language',
          f.description AS 'description',
          f.icon AS 'icon',
          f.status AS 'status'
        FROM
          pr_frameworks f
          LEFT JOIN pr_languages l ON f.language_id = l.uid
        WHERE
          f.language_id = ?
          AND ${where_} ${andsearch}
        ORDER BY
          f.name ASC
        LIMIT
          ?, ?`,
        [language_id, offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } else {
      pool.query(
        `SELECT
          f.uid AS 'uid',
          f.name AS 'name',
          l.name AS 'language',
          f.description AS 'description',
          f.icon AS 'icon',
          f.status AS 'status'
        FROM
          pr_frameworks f
          LEFT JOIN pr_languages l ON f.language_id = l.uid
        WHERE
          ${where_} ${andsearch}
        ORDER BY
          f.name ASC
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
    }
  },

  getTotalRecords: ({ where_, andsearch }, callback) => {
    pool.query(
      `SELECT
        COUNT(f.uid) AS all_totals
      FROM
        pr_frameworks f
        LEFT JOIN pr_languages l ON f.language_id = l.uid
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

  getFrameworkByFrameworkId: ({ where_, framework_id }, callback) => {
    pool.query(
      `SELECT
        f.uid AS 'uid',
        f.name AS 'name',
        l.name AS 'language',
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
      [framework_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  updateFramework: (
    id,
    { language_id, name, description, icon, added_by },
    callback
  ) => {
    pool.query(
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
      [language_id, name, description, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteFramework: (id, callback) => {
    pool.query(
      `UPDATE
        pr_frameworks
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

  reactivateFramework: (id, callback) => {
    pool.query(
      `UPDATE
        pr_frameworks
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
