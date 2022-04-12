const pool = require("../../config/db.config");

module.exports = {
  addCodeSnippet: (
    {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      implementation_id,
      title,
      row_code,
      file_extension,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_code_snippets(
          title,
          row_code,
          file_extension,
          func_id,
          subfunc_id,
          language_id,
          framework_id,
          implementation_id,
          instructions,
          added_by
        )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        row_code,
        file_extension,
        func_id,
        subfunc_id,
        language_id,
        framework_id,
        implementation_id,
        instructions,
        added_by,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateCodeSnippet: (
    id,
    {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      implementation_id,
      title,
      row_code,
      file_extension,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
        title = ?,
        row_code = ?,
        file_extension = ?,
        func_id = ?,
        subfunc_id = ?,
        language_id = ?,
        framework_id = ?,
        implementation_id = ?,
        instructions = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [
        title,
        row_code,
        file_extension,
        func_id,
        subfunc_id,
        language_id,
        framework_id,
        implementation_id,
        instructions,
        added_by,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getCodeSnippets: (
    {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      where_,
      offset,
      rpp,
      andsearch,
    },
    callback
  ) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.row_code,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.framework_id,
        c.file_extension,
        c.instructions,
        c.added_by,
        u.fullname,
        c.upvoters,
        c.downvoters,
        c.status
      FROM
        pr_code_snippets c
        LEFT JOIN pr_implementations i ON c.implementation_id = i.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
      WHERE
        c.func_id = ?
        AND c.subfunc_id = ?
        AND c.language_id = ?
        AND c.framework_id = ?
        AND ${where_} ${andsearch}
      ORDER BY
        c.uid DESC
      LIMIT
        ?, ?`,
      [func_id, subfunc_id, language_id, framework_id, offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        //console.log(results);
        return callback(null, results[0]);
      }
    );
  },

  searchCodesnippet: ({ where_, offset, rpp, andsearch }, callback) => {
    pool.query(
      `SELECT
        count(c.uid),
        c.uid,
        c.title,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.added_by,
        c.added_date,
        u.fullname,
        i.title AS impl_title
      FROM
        pr_code_snippets c
        LEFT JOIN pr_implementations i ON c.implementation_id = i.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
      WHERE
       ${where_} ${andsearch}
      ORDER BY
        c.uid DESC
      LIMIT
        ?, ?`,
      [offset, rpp],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        //console.log(results);
        return callback(null, results);
      }
    );
  },

  getImplNames: (
    { where_, func_id, subfunc_id, language_id, framework_id, andsearch },
    callback
  ) => {
    pool.query(
      `SELECT
        i.title AS 'implementation'
       FROM
        pr_code_snippets c
      LEFT JOIN  pr_implementations i
      ON c.implementation_id = i.uid
      WHERE
        c.func_id = ?
        AND c.subfunc_id = ?
        AND c.language_id = ?
        AND c.framework_id = ?
        AND ${where_} ${andsearch}`,
      [func_id, subfunc_id, language_id, framework_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getTotalRecords: (
    { where_, func_id, subfunc_id, language_id, framework_id, andsearch },
    callback
  ) => {
    pool.query(
      `SELECT
        COUNT(c.uid) AS all_totals
       FROM
        pr_code_snippets c
      LEFT JOIN  pr_implementations i
      ON c.implementation_id = i.uid
      WHERE
        c.func_id = ?
        AND c.subfunc_id = ?
        AND c.language_id = ?
        AND c.framework_id = ?
        AND ${where_} ${andsearch}`,
      [func_id, subfunc_id, language_id, framework_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  getCodeSnippetByCodeSnippetId: (id, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.row_code,
        c.file_extension,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.framework_id,
        c.instructions,
        c.added_by,
        u.fullname,
        i.title AS 'impl_title',
        c.added_date,
        c.upvoters,
        c.downvoters
      FROM
        pr_code_snippets c
        LEFT JOIN pr_implementations i ON c.implementation_id = i.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
      WHERE
        c.uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  deleteCodeSnippet: (id, callback) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
        status = ?
      WHERE
        uid = ?`,
      [0, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
};
