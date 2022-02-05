const pool = require("../../config/db.config");

module.exports = {
  addDbms: ({ name, description, icon, added_by }, callback) => {
    pool.query(
      `INSERT INTO pr_dbms(name, description, icon, added_by) VALUES(?, ?, ?, ?)`,
      [name, description, icon, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getDbmses: ({ status, offset, rpp }, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_dbms WHERE status = ? ORDER BY name ASC LIMIT ?,?`,
      [status, offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getDbmsByDbmsId: (id, callback) => {
    pool.query(
      `SELECT uid, name, description, icon, added_by, added_at FROM pr_dbms WHERE uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateDbms: (id, { name, description, icon, added_by }, callback) => {
    pool.query(
      `UPDATE pr_dbms SET name=?, description=?, icon=?, added_by=? WHERE uid =?`,
      [name, description, icon, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteDbms: (id, callback) => {
    pool.query(
      `UPDATE pr_dbms SET status = ? WHERE uid =?`,
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
