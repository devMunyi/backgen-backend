const { query } = require("express");
const pool = require("../../config/db.config");

module.exports = {
  addSubfunc: ({ func_id, name, added_by }, callback) => {
    pool.query(
      `INSERT INTO
        pr_subfunctions(func_id, name, added_by)
      VALUES
      (?, ?, ?)`,
      [func_id, name, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getSubfuncs: ({ where_, andsearch, rpp, offset }, callback) => {
    pool.query(
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
        ${where_} ${andsearch}
        AND sf.uid > 0
      ORDER BY
        sf.name
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
        COUNT(sf.uid) AS all_totals
      FROM
        pr_subfunctions sf
        LEFT JOIN pr_functionalities f ON sf.func_id = f.uid
      WHERE
        ${where_} ${andsearch}
        AND sf.uid > 0`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getSubfuncBySubfuncId: ({ where_, subfun_id }, callback) => {
    pool.query(
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
      [subfun_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  updateSubfunc: (id, { func_id, name, added_by }, callback) => {
    pool.query(
      `UPDATE
        pr_subfunctions
      SET
        func_id = ?,
        name = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [func_id, name, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteSubfunc: (id, callback) => {
    pool.query(
      `UPDATE
        pr_subfunctions
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

  reactivateSubfunc: (id, callback) => {
    pool.query(
      `UPDATE
        pr_subfunctions
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
