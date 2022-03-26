const pool = require("../../config/db.config");

module.exports = {
  addImplementation: (
    { func_id, subfunc_id, title, description, added_by},
    callback
  ) => {
    pool.query(
      `INSERT INTO pr_implementations(func_id, subfunc_id, title, description, added_by) VALUES (?, ?, ?, ?, ?)`,
      [func_id, subfunc_id, title, description, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getImplementations: ({ sel_func, sel_subfunc, status }, callback) => {
    if (sel_func && sel_subfunc) {
      pool.query(
        `SELECT uid, func_id, subfunc_id, title, description, added_by, added_date, updated_date, upvoters, downvoters FROM pr_implementations WHERE func_id = ? AND subfunc_id = ? AND status = ? ORDER BY title ASC`,
        [sel_func, sel_subfunc, status],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } else {
      pool.query(
        `SELECT uid, func_id, subfunc_id, title, description, added_by, added_date, updated_date, upvoters, downvoters FROM pr_implementations WHERE status = ? ORDER BY title ASC`,
        [1],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    }
  },
  getImplementationByImplementationId: (id, callback) => {
    pool.query(
      `SELECT uid, func_id, subfunc_id, title, description, added_by, added_date, updated_date, upvoters, downvoters FROM pr_implementations where uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateImplementation: (
    id,
    { func_id, subfunc_id, title, description, added_by},
    callback
  ) => {
    pool.query(
      `UPDATE pr_implementations SET func_id=?, subfunc_id=?, title=?, description=?, added_by=? where uid =?`,
      [
        func_id,
        subfunc_id,
        title,
        description,
        added_by,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteImplementation: (id, callback) => {
    pool.query(
      `UPDATE pr_implementations SET status = ? WHERE uid =?`,
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
