const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid functionality id (uid which doesn't exist in the table) is not parsed as param on making request
  checkCountryId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_countries WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new functionality, to handle name/title uniqueness
  checkCountriesByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_countries WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when editing Country details, to handle name uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_countries WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
