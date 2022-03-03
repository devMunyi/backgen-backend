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
      platform_id,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `INSERT INTO pr_code_snippets(row_code, file_extension, language_id, framework_id, implementation_id, dbms_id, platform_id, instructions, added_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row_code,
        file_extension,
        language_id,
        framework_id,
        implementation_id,
        dbms_id,
        platform_id,
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
  getCodeSnippets: (
    { language_id, framework_id, implementation_id, dbms_id, platform_id },
    callback
  ) => {
    pool.query(
      `SELECT uid, row_code, file_extension, language_id, framework_id, implementation_id, dbms_id, platform_id, instructions, added_by, added_date, updated_date, upvoters, downvoters FROM pr_code_snippets WHERE language_id = ? AND framework_id = ? AND implementation_id = ? AND dbms_id = ? AND platform_id = ? AND status = ?`,
      [language_id, framework_id, implementation_id, dbms_id, platform_id, 1],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCodeSnippetByCodeSnippetId: (id, callback) => {
    pool.query(
      `SELECT  uid, row_code, file_extension, language_id, framework_id, implementation_id, dbms_id, platform_id, instructions, added_by, added_date, updated_date, upvoters, downvoters FROM pr_code_snippets WHERE uid = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
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
      platform_id,
      instructions,
      added_by,
    },
    callback
  ) => {
    pool.query(
      `UPDATE pr_code_snippets SET row_code=?, file_extension=?, language_id=?, framework_id=?, implementation_id=?, dbms_id=?, platform_id=?, instructions=?, added_by=? WHERE uid =?`,
      [
        row_code,
        file_extension,
        language_id,
        framework_id,
        implementation_id,
        dbms_id,
        platform_id,
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

  deleteCodeSnippet: (id, callback) => {
    pool.query(
      `UPDATE pr_code_snippets SET status = ? WHERE uid =?`,
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
