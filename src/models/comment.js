const pool = require("../../config/db.config");

module.exports = {
  addComment: (
    { code_snippet_id, text, replies_to, added_by},
    callback
  ) => {
    pool.query(
      `INSERT INTO pr_comments(code_snippet_id, text, replies_to, added_by) VALUES(?, ?, ?, ?)`,
      [code_snippet_id, text, replies_to, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getComments: (callback) => {
    pool.query(
      `SELECT uid, code_snippet_id, text, replies_to, added_by, added_date, updated_date, upvoters, downvoters, status FROM pr_comments`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCommentByCommentId: (id, callback) => {
    pool.query(
      `SELECT uid, code_snippet_id, text, replies_to, added_by, added_date, updated_date, upvoters, downvoters, status FROM pr_comments WHERE uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateComment: (
    id,
    { code_snippet_id, text, replies_to, added_by},
    callback
  ) => {
    pool.query(
      `UPDATE pr_comments SET code_snippet_id=?, text=?, replies_to=?, added_by=? WHERE uid =?`,
      [code_snippet_id, text, replies_to, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteComment: (id, callback) => {
    pool.query(
      `UPDATE pr_comments SET status = ? WHERE uid =?`,
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
