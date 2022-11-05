const pool = require('../../config/db.config'); //require database configurations for CRUD operations

module.exports = {
  addCodeSnippet: (
    {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      lang_impl_type_id,
      user_impl_type_id,
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
          lang_impl_type_id,
          user_impl_type_id,
          instructions,
          added_by
        )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        row_code,
        file_extension,
        func_id,
        subfunc_id,
        language_id,
        framework_id,
        lang_impl_type_id,
        user_impl_type_id,
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
      lang_impl_type_id,
      user_impl_type_id,
      title,
      row_code,
      file_extension,
      instructions,
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
        lang_impl_type_id = ?,
        user_impl_type_id = ?,
        instructions = ?
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
        lang_impl_type_id,
        user_impl_type_id,
        instructions,
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

  getCodeSnippets: ({ where_, offset, rpp, orderby }, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.func_id,
        fn.name AS 'fun_name',
        c.subfunc_id,
        sb.name AS 'subfun_name',
        c.language_id,
        l.name AS 'language_name',
        c.framework_id,
        lit.title AS 'language_implementation_type',
        uit.title AS 'user_implementation_type',
        uit.uid AS 'codestyle_id',
        uit.title AS 'codestyle_name',
        f.name AS 'framework',
        c.status,
        c.added_date
      FROM
        pr_code_snippets c
      LEFT JOIN  pr_language_implementation_type lit
      ON c.lang_impl_type_id = lit.uid
      LEFT JOIN  pr_user_implementation_type uit
      ON c.user_impl_type_id = uit.uid
      LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
      LEFT JOIN  pr_languages l
      ON c.language_id = l.uid
      LEFT JOIN pr_users u ON c.added_by = u.uid
      LEFT JOIN  pr_functionalities fn
      ON c.func_id = fn.uid
      LEFT JOIN pr_subfunctions sb
      ON c.subfunc_id = sb.uid
      WHERE
        ${where_}
      ORDER BY ${orderby}
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

  getRelatedSolns: ({ where_, offset, rpp }, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        l.name AS 'language_name',
        c.framework_id,
        lit.title AS 'language_implementation_type',
        uit.title AS 'user_implementation_type',
        uit.uid AS 'codestyle_id',
        uit.title AS 'codestyle_name',
        f.name AS 'framework'
      FROM
        pr_code_snippets c
      LEFT JOIN  pr_language_implementation_type lit
      ON c.lang_impl_type_id = lit.uid
      LEFT JOIN  pr_user_implementation_type uit
      ON c.user_impl_type_id = uit.uid
      LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
      LEFT JOIN  pr_languages l
      ON c.language_id = l.uid
      LEFT JOIN pr_users u ON c.added_by = u.uid
      WHERE
        ${where_}
      ORDER BY
        c.uid DESC
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

  getCodeSnippetByCodeSnippetId: (where_, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.row_code,
        c.file_extension,
        c.func_id,
        fn.name AS 'fun_name',
        c.subfunc_id,
        sb.name AS 'subfun_name',
        c.language_id,
        l.name AS 'language_name',
        c.framework_id,
        f.name AS 'framework_name',
        c.instructions,
        c.added_by,
        u.fullname,
        u.username,
        u.auth_provider AS 'provider',
        lit.title AS 'language_implementation_type',
        uit.title AS 'user_implementation_type',
        uit.uid AS 'codestyle_id',
        uit.title AS 'codestyle_name',
        c.added_date,
        c.total_comments,
        c.views
      FROM
        pr_code_snippets c
        LEFT JOIN  pr_language_implementation_type lit
      ON c.lang_impl_type_id = lit.uid
        LEFT JOIN  pr_user_implementation_type uit
      ON c.user_impl_type_id = uit.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
        LEFT JOIN  pr_languages l
      ON c.language_id = l.uid
        LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
      LEFT JOIN  pr_functionalities fn
      ON c.func_id = fn.uid
      LEFT JOIN pr_subfunctions sb
      ON c.subfunc_id = sb.uid
      WHERE ${where_}`,
      [],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  searchCodesnippet: ({ where_, offset, rpp, orderby }, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.func_id,
        fn.name AS 'fun_name',
        c.subfunc_id,
        sb.name AS 'subfun_name',
        c.language_id,
        l.name AS 'language_name',
        c.framework_id,
        f.name AS 'framework_name',
        c.added_by,
        c.added_date,
        u.fullname,
        u.username,
        u.auth_provider AS 'provider',
        lit.title AS 'language_implementation_type',
        uit.title AS 'user_implementation_type',
        uit.uid AS 'codestyle_id'
      FROM
        pr_code_snippets c
        LEFT JOIN  pr_language_implementation_type lit
      ON c.lang_impl_type_id = lit.uid
        LEFT JOIN  pr_user_implementation_type uit
      ON c.user_impl_type_id = uit.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
        LEFT JOIN  pr_languages l
      ON c.language_id = l.uid
      LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
      LEFT JOIN  pr_functionalities fn
      ON c.func_id = fn.uid
      LEFT JOIN pr_subfunctions sb
      ON c.subfunc_id = sb.uid
      WHERE ${where_} ORDER BY ${orderby}
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

  getTotalRecords: ({ where_ }, callback) => {
    pool.query(
      `SELECT
        COUNT(c.uid) AS all_totals
      FROM
        pr_code_snippets c
      WHERE
        ${where_}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },

  searchTotals: ({ where_ }, callback) => {
    pool.query(
      `SELECT
        count(c.uid) AS "search_totals"
      FROM
        pr_code_snippets c
      WHERE ${where_}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        //console.log(results);
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
      [3, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        //console.log("delete response => ", results[0]);
        return callback(null, results);
      }
    );
  },

  incrementViewsTotal: (code_snippet_id, callback) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
      views = views + 1
      WHERE
        uid = ?`,
      [code_snippet_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  incrementCommentsTotal: (code_snippet_id, callback) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
      total_comments = total_comments + 1
      WHERE
        uid = ?`,
      [code_snippet_id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  decrementCommentsTotal: (code_snippet_id, callback) => {
    pool.query(
      `UPDATE
        pr_code_snippets
      SET
      total_comments = total_comments - 1
      WHERE
        uid = ?`,
      [code_snippet_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  reactivateCode: (id, callback) => {
    pool.query(
      `UPDATE
        pr_code_snippets
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
