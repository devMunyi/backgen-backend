const pool = require("../../config/db.config");

module.exports = {
  addFunc: ({ name, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_functionalities(name, icon, added_by) VALUES(?, ?, ?)`,
      [name, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getFuncs: ({ status }, callback) => {
    pool.query(
      `SELECT uid, name, icon, added_at, added_by, updated_at FROM pr_functionalities WHERE status = ? ORDER BY name`,
      [status],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getFuncByFuncId: (id, callback) => {
    pool.query(
      `SELECT uid, name, icon, added_by, added_at, updated_at, status FROM pr_functionalities WHERE uid = ? AND status = 1`,
      [id],
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
      `UPDATE pr_functionalities SET name=?, icon=?, added_by = ? WHERE uid =?`,
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
      `UPDATE pr_functionalities SET status = ? WHERE uid =?`,
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
