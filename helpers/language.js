const pool = require('../config/db.config');

module.exports = {
  // used to ensure invalid language id (uid which doesn't exist in the table) is not parsed as param on making request
  checkLanguageId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_languages WHERE uid = ? AND status = ?`,
        [id, 1]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when adding new language, to handle name/title uniqueness
  checkLanguagesByName: async (name) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_languages WHERE name = ?`,
        [name]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // used when editing language details, to handle name/title uniqueness
  checkIfSimilarNameExist: async (name, id) => {
    try {
      const results = await pool.query(
        `SELECT uid FROM pr_languages WHERE name = ? AND uid != ?`,
        [name, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  fetchLanguageById: async (langId) => {
    try {
      const results = await pool.query(
        `SELECT name FROM pr_languages WHERE uid = ? LIMIT 0,1`,
        [langId]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
