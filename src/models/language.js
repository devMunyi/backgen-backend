const pool = require("../../config/db.config");

module.exports = {
  addLanguage: ({ name, description, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_languages(name, description, icon, added_by) VALUES(?, ?, ?, ?)`,
      [name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getLanguages: ({ status, offset, rpp }, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_languages WHERE status = ? ORDER BY uid LIMIT ?,?`,
      [status, offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getLanguageByLanguageId: (id, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_languages WHERE uid = ? AND status=1`,
      [id],
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
      `UPDATE pr_languages SET name=?, description=?, icon=?, added_by=? WHERE uid =?`,
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
      `UPDATE pr_languages SET status = ? WHERE uid =?`,
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
