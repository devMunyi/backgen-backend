const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid functionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkFunId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_functionalities WHERE uid = ? AND status = ?`,
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

  //used when adding new functionality, to handle name/title uniqueness
  checkFunsByName: (name, callback) => {
    pool.query(
      `SELECT uid FROM pr_functionalities WHERE name = ?`,
      [name],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        } else {
          return callback(null, results[0]);
        }
      }
    );
  },

  //Used when editing functionality details, to handle name/title uniqueness
  checkIfSimilarNameExist: (name, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_functionalities WHERE name = ? AND uid != ?`,
      [name, id],
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
