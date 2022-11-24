const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addCountry: async ({ name, abbrev, flag, added_by }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_countries(name, abbrev, flag, added_by)
        VALUES
        (?, ?, ?, ?)`,
        [name, abbrev, flag, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
  getCountries: async ({ where_, offset, rpp, orderby = 'name ASC' }) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          abbrev,
          flag,
          added_at,
          added_by,
          updated_at
        FROM
          pr_countries
        WHERE
          ${where_}
        ORDER BY
          ${orderby}
        LIMIT
          ?, ?`,
        [offset, rpp]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getCountryByCountryId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          name,
          abbrev,
          flag,
          added_by,
          added_at,
          updated_at,
          status
        FROM
          pr_countries
        WHERE
          uid = ?
          AND status = 1`,
        [id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateCountry: async (id, { name, abbrev, flag, added_by }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_countries
        SET
          name = ?,
          abbrev = ?,
          flag = ?,
          added_by = ?
        WHERE
          uid = ?`,
        [name, abbrev, flag, added_by, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteCountry: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_countries
        SET
          status = ?
        WHERE
          uid = ?`,
        [0, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
