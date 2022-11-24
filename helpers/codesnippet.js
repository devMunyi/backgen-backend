const pool = require('../config/db.config');

module.exports = {
  checkCodesnippetId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_code_snippets WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  checkCodeAddDuplicate: async (row_code) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_code_snippets WHERE row_code = ? AND status NOT IN(0,3)`,
        [row_code]
      );
      return results[0];
    } catch (error) {
      throw error;
    }
  },

  checkCodeEditDuplicate: async (row_code, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_code_snippets WHERE row_code = ? AND uid != ? AND status NOT IN(0,3)`,
        [row_code, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
