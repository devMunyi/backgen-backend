const pool = require("../../config/db.config");

module.exports = {
  addCodeSnippet: (
    {
      row_code,
      file_extension,
      language_id,
      framework_id,
      implementation_id,
      dbms_id,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_code_snippets(
          row_code,
          file_extension,
          language_id,
          framework_id,
          implementation_id,
          dbms_id,
          instructions,
          added_by
        )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?) `,
      [
        row_code,
        file_extension,
        language_id,
        framework_id,
        implementation_id,
        dbms_id,
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
      row_code,
      file_extension,
      language_id,
      framework_id,
      implementation_id,
      dbms_id,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
        row_code = ?,
        file_extension = ?,
        language_id = ?,
        framework_id = ?,
        implementation_id = ?,
        dbms_id = ?,
        instructions = ?,
        added_by = ?
      WHERE
        uid = ?`,
      [
        row_code,
        file_extension,
        language_id,
        framework_id,
        implementation_id,
        dbms_id,
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
      implementation_id,
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
        c.file_extension,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.framework_id,
        c.implementation_id,
        i.title AS 'implementation_title',
        c.instructions,
        c.added_by,
        u.fullname,
        c.added_date,
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
        AND c.implementation_id = ?
        AND ${where_} ${andsearch}
      ORDER BY
        c.uid DESC
      LIMIT
        ?, ?`,
      [
        func_id,
        subfunc_id,
        language_id,
        framework_id,
        implementation_id,
        offset,
        rpp,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        return callback(null, results[0]);
      }
    );
  },

  getTotalRecords: (
    {
      where_,
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      implementation_id,
      andsearch,
    },
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
        AND c.implementation_id = ?
        AND ${where_} ${andsearch}`,
      [func_id, subfunc_id, language_id, framework_id, implementation_id],
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
        uid,
        row_code,
        file_extension,
        language_id,
        framework_id,
        implementation_id,
        dbms_id,
        instructions,
        added_by,
        added_date,
        updated_date,
        upvoters,
        downvoters
      FROM
        pr_code_snippets
      WHERE
        uid = ?`,
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
        return callback(null, results);
      }
    );
  },
};
