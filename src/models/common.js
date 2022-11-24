const pool = require('../../config/db.config'); //require database configurations for CRUD operations
module.exports = {
  totalRecords: async ({
    table,
    field,
    where_,
    desiredName = 'all_totals',
  }) => {
    try {
      const result = await pool.query(
        `SELECT
          COUNT(${field}) AS ${desiredName}
        FROM
          ${table}
        WHERE
          ${where_}`,
        []
      );
      return result[0][0];
    } catch (error) {
      throw error;
    }
  },

  incrementCounter: async ({ table, field, uid, step = 1 }) => {
    try {
      const result = await pool.query(
        `UPDATE
          ${table}
        SET
        ${field} = ${field} + ${step}
        WHERE
          uid = ?`,
        [uid]
      );

      return result[0][0];
    } catch (error) {
      throw error;
    }
  },

  decrementCounter: async ({ table, field, uid, step = 1 }) => {
    try {
      const result = await pool.query(
        `UPDATE
          ${table}
        SET
        ${field} = ${field} - ${step}
        WHERE
          uid = ?`,
        [uid]
      );

      return result[0][0];
    } catch (error) {
      throw error;
    }
  },
};
