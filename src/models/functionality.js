const pool = require("../../config/db.config"); //require database configurations for CRUD operations

module.exports = {
  addFunc: ({ name, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO
        pr_functionalities(name, icon, added_by)
      VALUES
      (?, ?, ?)`,
      [name, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getFuncs: ({ where_, andsearch, offset, rpp }, callback) => {
    pool.query(
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
        ${where_} ${andsearch}
      ORDER BY
        name ASC
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

  getFuncByFuncId: ({ where_, func_id }, callback) => {
    pool.query(
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
      [func_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateFunc: (id, { name, icon, added_by }, callback) => {
    pool.query(
      `UPDATE
        pr_functionalities
      SET
        name = ?,
        icon = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [name, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteFunc: (id, callback) => {
    pool.query(
      `UPDATE
        pr_functionalities
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

  reactivateFunc: (id, callback) => {
    pool.query(
      `UPDATE
        pr_functionalities
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
