const pool = require('../../config/db.config'); //require database configurations for CRUD operations
module.exports = {
  addCodeSnippet: async ({
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
  }) => {
    try {
      const result = await pool.query(
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
        ]
      );

      return result[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateCodeSnippet: async (
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
    }
  ) => {
    try {
      const result = await pool.query(
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
        ]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  getCodeSnippets: async ({ where_, offset, rpp, orderby }) => {
    try {
      const result = await pool.query(
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
          c.added_date,
          c.views
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
        [offset, rpp]
      );
      return result[0];
    } catch (error) {
      throw error;
    }
  },

  getRelatedSolns: async ({ where_, offset, rpp, orderby = 'c.uid DESC' }) => {
    try {
      const results = await pool.query(
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
          f.name AS 'framework',
          c.views
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

  getCodeSnippetByCodeSnippetId: async (where_) => {
    try {
      const result = await pool.query(
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
        []
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  searchCodesnippet: async ({ where_, offset, rpp, orderby }) => {
    try {
      const results = await pool.query(
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
        [offset, rpp]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteCodeSnippet: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_code_snippets
        SET
          status = ?
        WHERE
          uid = ?`,
        [3, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  reactivateCode: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_code_snippets
        SET
          status = ?
        WHERE
          uid = ?`,
        [1, id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // codesnippets archives
  archiveCode: async ({
    codesnippet_id,
    title,
    archive_row_code,
    archived_by,
  }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
        pr_codesnippets_archive(
          codesnippet_id,
          title,
          archive_row_code,
          archived_by
          )
        VALUES
        (?, ?, ?, ?)`,
        [codesnippet_id, title, archive_row_code, archived_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  // get archived particular codesnippets
  getCodeArchives: async ({ where_, orderby = 'uid', offset, rpp }) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          codesnippet_id,
          title,
          archive_row_code,	
          archived_by
        FROM
        pr_codesnippets_archive 
        WHERE
          ${where_}
        ORDER BY ${orderby}
        LIMIT
          ?, ?`,
        [offset, rpp]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },
};
