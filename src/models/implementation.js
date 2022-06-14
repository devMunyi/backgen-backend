const pool = require("../../config/db.config"); //require database configurations for CRUD operations

module.exports = {
  addImplementation: (
    { title, description, func_id, subfunc_id, added_by },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_implementations(title, description, func_id, subfunc_id, added_by)
      VALUES
        (?, ?, ?, ?, ?)`,
      [title, description, func_id, subfunc_id, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getImplementations: ({ where_, andsearch, offset, rpp }, callback) => {
    pool.query(
      `SELECT
        uid,
        func_id,
        subfunc_id,
        title,
        description,
        status
      FROM
        pr_implementations
      WHERE
        ${where_} ${andsearch}
      ORDER BY
        title ASC
      LIMIT
        ?, ?`,
      [offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getTotalRecords: ({ where_, andsearch }, callback) => {
    pool.query(
      `SELECT
        COUNT(uid) AS all_totals
      FROM
        pr_implementations
      WHERE
        ${where_} ${andsearch}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getImplementationsByFunAndSubfun: ({ sel_func, sel_subfunc }, callback) => {
    pool.query(
      `SELECT
        uid,
        func_id,
        subfunc_id,
        title,
        description,
        status
      FROM
        pr_implementations
      WHERE
        func_id = ?
        AND subfunc_id = ?
        AND status = ?
      ORDER BY
        title ASC`,
      [sel_func, sel_subfunc, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getTotalRecords2: ({ sel_func, sel_subfunc }, callback) => {
    pool.query(
      `SELECT
        COUNT(uid) AS all_totals
      FROM  
        pr_implementations
      WHERE
        func_id = ?
        AND subfunc_id = ?
        AND status = ?`,
      [sel_func, sel_subfunc, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getImplementationByImplementationId: (
    { where_, implementation_id },
    callback
  ) => {
    pool.query(
      `SELECT
        uid,
        func_id,
        subfunc_id,
        title,
        description,
        added_by,
        added_date,
        upvoters,
        downvoters
      FROM
        pr_implementations
      WHERE
        uid = ?
        AND ${where_}`,
      [implementation_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  updateImplementation: (
    id,
    { func_id, subfunc_id, title, description, added_by },
    callback
  ) => {
    pool.query(
      `UPDATE
        pr_implementations
      SET
        func_id = ?,
        subfunc_id = ?,
        title = ?,
        description = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [func_id, subfunc_id, title, description, added_by, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteImplementation: (id, callback) => {
    pool.query(
      `UPDATE
        pr_implementations
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

  reactivateImplementation: (id, callback) => {
    pool.query(
      `UPDATE
        pr_implementations
      SET
        status = ?
      WHERE
        uid = ?`,
      [1, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
