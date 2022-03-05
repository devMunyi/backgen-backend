const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid functionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkCountryId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_countries WHERE uid = ? AND status = ?`,
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
  checkCountriesByName: (name, callback) => {
    pool.query(
      `SELECT uid FROM pr_countries WHERE name = ?`,
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

  //Used when editing Country details, to handle name uniqueness
  checkIfSimilarNameExist: (name, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_countries WHERE name = ? AND uid != ?`,
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
