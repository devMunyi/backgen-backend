const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid framework id (uid which doesn't exist in the table) is not parsed as param on making request
  checkFrameworkId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_frameworks WHERE uid = ? AND status = ?`,
      [id, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //used when adding new framework, to handle name/title uniqueness
  checkFrameworksByName: (name, callback) => {
    pool.query(
      `SELECT uid FROM pr_frameworks WHERE name = ? AND status = ?`,
      [name, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //Used when editing framework details, to handle name/title uniqueness
  checkIfSimilarNameExist: (name, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_frameworks WHERE name = ? AND status = ? AND uid != ?`,
      [name, 1, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },
};
