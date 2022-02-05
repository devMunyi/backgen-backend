const pool = require("../../config/db.config");

module.exports = {
  addPlatform: ({ name, description, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_platforms(name, description, icon, added_by) VALUES(?, ?, ?, ?)`,
      [name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPlatforms: ({ status, rpp }, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_platforms WHERE status = ? ORDER BY name ASC LIMIT ?`,
      [status, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPlatformByPlatformId: (id, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_platforms WHERE uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updatePlatform: (id, { name, description, icon, added_by }, callback) => {
    pool.query(
      `UPDATE pr_platforms SET name=?, description=?, icon=?, added_by=? WHERE uid =?`,
      [name, description, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deletePlatform: (id, callback) => {
    pool.query(
      `UPDATE pr_platforms SET status = ? WHERE uid =?`,
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
