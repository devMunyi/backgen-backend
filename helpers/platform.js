const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid platform id (uid which doesn't exist in the table) is not parsed as param on making request
  checkPlatformId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_platforms WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0][0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new platform, to handle name/title uniqueness
  checkPlatformsByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_platforms WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when editing platform details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_platforms WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
