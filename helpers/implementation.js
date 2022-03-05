const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid implementation id (uid which doesn't exist in the table) is not parsed as param on making request
  checkImplementationId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_implementations WHERE uid = ? AND status = ?`,
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

  //used when adding new implementation, to handle name/title uniqueness
  checkImplementationsByTitle: (title, callback) => {
    pool.query(
      `SELECT uid FROM pr_implementations WHERE title = ?`,
      [title],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //Used when editing implementation details, to handle name/title uniqueness
  checkIfSimilarTitleExist: (title, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_implementations WHERE title = ? AND uid != ?`,
      [title, id],
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
