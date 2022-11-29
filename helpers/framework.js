const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid framework id (uid which doesn't exist in the table) is not parsed as param on making request
  checkFrameworkId: async (id) => {
    try {
      const results = pool.query(
        `SELECT uid FROM pr_frameworks WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      return results[0];
    }
  },

  // used when adding new framework, to handle name/title uniqueness
  checkFrameworksByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_frameworks WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      return results[0];
    }
  },

  // Used when editing framework details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_frameworks WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
