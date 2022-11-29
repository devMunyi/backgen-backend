function inputAvailable(val) {}

const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid comment id (uid which doesn't exist in the table) is not parsed as param on making request
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

  parseToInt: (val) => parseInt(val, 10),
};
