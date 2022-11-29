const pool = require('../config/db.config');

module.exports = {
  checkCommentId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_comments WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new codesnippet, to handle name/title uniqueness
  checkCodesnippetsBycomment_body: async (comment_body) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_comments WHERE comment_body = ?`,
        [comment_body]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // Used when editing language details, to handle name/title uniqueness
  checkIfSimilarcomment_bodyExist: async (comment_body, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_comments WHERE comment_body = ? AND uid != ?`,
        [comment_body, 1, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
