const pool = require("../config/db.config");

module.exports = {
  //used to ensure invalid codesnippet id (uid which doesn't exist in the table) is not parsed as param on making request
  checkCommentId: (id, callback) => {
    pool.query(
      `SELECT uid FROM pr_comments WHERE uid = ? AND status = ?`,
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

  //used when adding new codesnippet, to handle name/title uniqueness
  checkCodesnippetsByText: (text, callback) => {
    pool.query(
      `SELECT uid FROM pr_comments WHERE text = ?`,
      [text],
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
  checkIfSimilarTextExist: (text, id, callback) => {
    pool.query(
      `SELECT uid FROM pr_comments WHERE text = ? AND uid != ?`,
      [text, 1, id],
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
