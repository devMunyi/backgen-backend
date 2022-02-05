const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid language id (uid which doesn't exist in the table) is not parsed as param on making request
  checkLanguageId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_languages WHERE uid = ? AND status = ?`,
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

  //used when adding new language, to handle name/title uniqueness
  checkLanguagesByName: (name, callback) => {
    pool.query(
      `SELECT uid FROM pr_languages WHERE name = ? AND status = ?`,
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

  //Used when editing language details, to handle name/title uniqueness
  checkIfSimilarNameExist: (name, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_languages WHERE name = ? AND status = ? AND uid != ?`,
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
