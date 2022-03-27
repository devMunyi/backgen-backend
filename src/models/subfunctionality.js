const { query } = require("express");
const pool = require("../../config/db.config");

module.exports = {
  addSubfunc: ({ func_id, name, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_subfunctions(func_id, name, added_by) VALUES(?, ?, ?)`,
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
      `SELECT uid, func_id, name, added_by, added_at, updated_at, status FROM pr_subfunctions WHERE ${where_} ${andsearch} ORDER BY name LIMIT ?,?`,
      [offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
   /*  if (orStatus === 0) {
      pool.query(
        `SELECT uid, func_id, name, added_by, added_at, updated_at, status FROM pr_subfunctions WHERE status = ? OR status = ? ORDER BY name LIMIT ?,?`,
        [status, orStatus, offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } else {
      pool.query(
        `SELECT uid, func_id, name, added_by, added_at, updated_at FROM pr_subfunctions WHERE status = ? ORDER BY name LIMIT ?,?`,
        [status, offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } */
  },

  getTotalRecords: ({where_, andsearch}, callback) => {
    pool.query(
      `SELECT COUNT(uid) AS all_totals FROM pr_subfunctions WHERE ${where_} ${andsearch}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getSubfuncBySubfuncId: ({ where_, subfun_id}, callback) => {
    pool.query(
      `SELECT uid, func_id, name, added_by, added_at, updated_at FROM pr_subfunctions WHERE uid = ? AND ${where_} LIMIT 0,1`,
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
      `UPDATE pr_subfunctions SET func_id=?, name=?, added_by=? WHERE uid =?`,
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
      `UPDATE pr_subfunctions SET status = ? WHERE uid =?`,
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
      `UPDATE pr_subfunctions SET status = ? WHERE uid =?`,
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
