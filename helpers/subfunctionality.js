const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid subfunctionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkSubfunId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_subfunctions WHERE uid = ? AND status = ?`,
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

  //used when adding new subfunctionality, to handle name/title uniqueness
  checkSubfunsByName: (name, callback) => {
    pool.query(
      `SELECT uid FROM pr_subfunctions WHERE name = ? AND status = ?`,
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

  //Used when editing subfunctionality details, to handle name/title uniqueness
  checkIfSimilarNameExist: (name, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_subfunctions WHERE name = ? AND status = ? AND uid != ?`,
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
