const pool = require("../../config/db.config");

module.exports = {
  addFramework: (data, callback) => {
    pool.query(
      `INSERT INTO pr_frameworks(language_id, name, description, icon, added_by) VALUES(?, ?, ?, ?, ?)`,
      [data.language_id, data.name, data.description, data.icon, data.added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getFrameworks: ({ language_id, status, offset, rpp }, callback) => {
    if (language_id) {
      pool.query(
        `SELECT uid, language_id, name, description, icon FROM pr_frameworks WHERE language_id = ? AND status = ? ORDER BY uid ASC LIMIT ?,?`,
        [language_id, status, offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } else {
      pool.query(
        `SELECT uid, language_id, name, description, icon FROM pr_frameworks WHERE status = ? ORDER BY name ASC LIMIT ?,?`,
        [status, offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    }
  },
  getFrameworkByFrameworkId: (id, callback) => {
    pool.query(
      `SELECT uid, language_id, name, description, icon, added_by, added_at FROM pr_frameworks WHERE uid = ?`,
      [id],
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
      `UPDATE pr_frameworks SET language_id=?, name=?, description=?, icon=?, added_by=? WHERE uid =?`,
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
      `UPDATE pr_frameworks SET status = ? WHERE uid =?`,
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
