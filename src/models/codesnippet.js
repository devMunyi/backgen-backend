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

  getCodeSnippets: ({ where_, offset, rpp }, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.row_code,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.framework_id,
        i.title AS 'implementation',
        f.name AS 'framework',
        l.name AS 'language'
      FROM
        pr_code_snippets c
      LEFT JOIN  pr_implementations i
      ON c.implementation_id = i.uid
      LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
      LEFT JOIN  pr_languages l
      ON c.language_id = l.uid
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
        //console.log("CODE RESULTS =>", results);
        return callback(null, results);
      }
    );
  },

  // getImplNames: ({ where_, offset, rpp }, callback) => {
  //   pool.query(
  //     `SELECT
  //       i.title AS 'implementation'
  //      FROM
  //       pr_code_snippets c
  //     LEFT JOIN  pr_implementations i
  //     ON c.implementation_id = i.uid
  //     WHERE
  //      ${where_}
  //     ORDER BY
  //       c.uid DESC
  //     LIMIT
  //       ?, ?`,
  //     [offset, rpp],
  //     (error, results, fields) => {
  //       if (error) {
  //         return callback(error);
  //       }
  //       //console.log("IMPL NAMES RESULTS =>", results);
  //       return callback(null, results);
  //     }
  //   );
  // },

  getTotalRecords: ({ where_, offset, rpp }, callback) => {
    pool.query(
      `SELECT
        COUNT(c.uid) AS all_totals
      FROM
        pr_code_snippets c
      LEFT JOIN  pr_implementations i
      ON c.implementation_id = i.uid
      LEFT JOIN  pr_frameworks f
      ON c.framework_id = f.uid
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
        //console.log("RESULTS TOTAL =>", results);
        return callback(null, results[0]);
      }
    );
  },

  searchTotals: ({ where_, andsearch }, callback) => {
    pool.query(
      `SELECT
        count(c.uid) AS "search_totals"
      FROM
        pr_code_snippets c
      WHERE
       ${where_} ${andsearch}
      ORDER BY
        c.uid DESC `,
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

  searchCodesnippet: ({ where_, offset, rpp, andsearch }, callback) => {
    pool.query(
      `SELECT
        c.uid,
        c.title,
        c.func_id,
        c.subfunc_id,
        c.language_id,
        c.framework_id,
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
        i.title AS 'impl_name',
        c.added_date,
        c.upvoters,
        c.downvoters
      FROM
        pr_code_snippets c
        LEFT JOIN pr_implementations i ON c.implementation_id = i.uid
        LEFT JOIN pr_users u ON c.added_by = u.uid
      WHERE
        c.uid = ? AND c.status = 1`,
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
