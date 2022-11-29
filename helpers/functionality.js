const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid functionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkFunId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_functionalities WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      return results[0];
    }
  },

  // used when adding new functionality, to handle name/title uniqueness
  checkFunsByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_functionalities WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when editing functionality details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_functionalities WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
