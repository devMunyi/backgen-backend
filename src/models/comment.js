// require database configurations for CRUD operations
const pool = require('../../config/db.config');

module.exports = {
  addComment: async ({
    code_snippet_id,
    comment_body,
    replying_to,
    tag,
    added_by,
  }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
          pr_comments(code_snippet_id, comment_body, replying_to, tag, added_by)
        VALUES
          (?, ?, ?, ?, ?)`,
        [code_snippet_id, comment_body, replying_to, tag, added_by]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getComments: async () => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          code_snippet_id,
          comment_body,
          replying_to,
          tag,
          added_by,
          added_date,
          votes
        FROM
          pr_comments`,
        []
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getCommentsByCodesnippetId: async ({
    where_,
    orderby = 'cmt.uid DESC',
    offset,
    rpp,
  }) => {
    try {
      const results = await pool.query(
        `
      SELECT
        cmt.uid,
        cmt.code_snippet_id,
        cmt.comment_body,
        cmt.replying_to,
        cmt.total_replies,
        cmt.votes,
        cmt.added_by AS 'author_id',
        u.fullname AS 'author_name',
        added_date, 
        t.tag_name,
        t.tag_icon,
        t.color AS 'tag_color'
      FROM
        pr_comments cmt
      LEFT JOIN pr_users u ON cmt.added_by = u.uid
      LEFT JOIN pr_tags t ON cmt.tag = t.uid
      WHERE ${where_} ORDER BY ${orderby} LIMIT ?,?`,
        [offset, rpp]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  getCommentByCommentId: async (id) => {
    try {
      const results = await pool.query(
        `SELECT
          uid,
          code_snippet_id,
          comment_body,
          replying_to,
          added_by,
          added_date,
          votes
        FROM
          pr_comments
        WHERE
          uid = ?`,
        [id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateComment: async ({ comment_body, comment_id }) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_comments
        SET
          comment_body = ?
        WHERE
          uid = ?`,
        [comment_body, comment_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (id) => {
    try {
      const results = await pool.query(
        `UPDATE
          pr_comments
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

  commentVotes: async (comment_id) => {
    try {
      const results = await pool.query(
        `SELECT
          votes
        FROM
          pr_comments
        WHERE
          uid = ?`,
        [comment_id]
      );

      return results[0][0];
    } catch (error) {
      throw error;
    }
  },
};
