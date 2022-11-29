const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid subfunctionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkSubfunId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_subfunctions WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new subfunctionality, to handle name/title uniqueness
  checkSubfunsByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_subfunctions WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // Used when editing subfunctionality details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_subfunctions WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
