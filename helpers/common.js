function inputAvailable(val) {}

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

  inputAvailable: (val) => {
    if (val != undefined) {
      val = val.toString().trim();
      if (val.length > 0) {
        return val;
      }
      return undefined;
    }
    return undefined;
  },
};
