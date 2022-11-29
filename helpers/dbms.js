const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid dbms id (uid which doesn't exist in the table) is not parsed as param on making request
  checkDbmsId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_dbms WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new Dbms, to handle name/title uniqueness
  checkDbmsesByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_dbms WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // Used when editing Dbms details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_dbms WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
