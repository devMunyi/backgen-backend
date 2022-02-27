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
  getSubfuncs: ({ status }, callback) => {
    pool.query(
      `SELECT uid, func_id, name, added_by, added_at, updated_at FROM pr_subfunctions WHERE status = ? ORDER BY name`,
      [status],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getSubfuncBySubfuncId: (id, callback) => {
    pool.query(
      `SELECT uid, func_id, name, added_by, added_at, updated_at FROM pr_subfunctions WHERE uid = ?`,
      [id],
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
};
