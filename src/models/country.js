const pool = require("../../config/db.config"); //require database configurations for CRUD operations

module.exports = {
  addCountry: ({ name, abbrev, flag, added_by }, callback) => {
    pool.query(
      `INSERT INTO
        pr_countries(name, abbrev, flag, added_by)
      VALUES
      (?, ?, ?, ?)`,
      [name, abbrev, flag, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCountries: ({ status, offset, rpp }, callback) => {
    pool.query(
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
        status = ?
      ORDER BY
        name
      LIMIT
        ?, ?`,
      [status, offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCountryByCountryId: (id, callback) => {
    pool.query(
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
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateCountry: (id, { name, abbrev, flag, added_by }, callback) => {
    pool.query(
      `UPDATE
        pr_countries
      SET
        name = ?,
        abbrev = ?,
        flag = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [name, abbrev, flag, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteCountry: (id, callback) => {
    pool.query(
      `UPDATE
        pr_countries
      SET
        status = ?
      WHERE
        uid = ?`,
      [0, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
