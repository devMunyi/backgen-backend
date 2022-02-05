const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid language id (uid which doesn't exist in the table) is not parsed as param on making request
  checkCodesnippetId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_code_snippets WHERE uid = ? AND status = ?`,
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
};
