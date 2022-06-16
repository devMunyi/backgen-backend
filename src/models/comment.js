const pool = require("../../config/db.config"); //require database configurations for CRUD operations
//const util = require("util");
// node native promisify
//const query = util.promisify(pool.query).bind(pool);

module.exports = {
  addComment: (
    { code_snippet_id, comment_body, replying_to, tag, added_by },
    callback
  ) => {
    pool.query(
      `INSERT INTO
        pr_comments(code_snippet_id, comment_body, replying_to, tag, added_by)
      VALUES
        (?, ?, ?, ?, ?)`,
      [code_snippet_id, comment_body, replying_to, tag, added_by],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getComments: (callback) => {
    pool.query(
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
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  getCommentsByCodesnippetId: (
    { where_, orderby, dir, offset, rpp },
    callback
  ) => {
    console.log(where_, orderby, dir, offset, rpp);
    try {
      pool.query(
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
      WHERE ${where_} ORDER BY cmt.uid ${dir} LIMIT ?,?`,
        [offset, rpp],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  getTotalCommentsCodeId: (where_, callback) => {
    try {
      pool.query(
        `
      SELECT
        COUNT(cmt.uid) AS total_comments
      FROM
        pr_comments cmt
      WHERE ${where_}`,
        [],
        (error, results, fields) => {
          if (error) {
            return callback(error);
          }
          return callback(null, results[0]);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  getCommentByCommentId: (id, callback) => {
    pool.query(
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
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateComment: ({ comment_body, comment_id }, callback) => {
    pool.query(
      `UPDATE
        pr_comments
      SET
        comment_body = ?
      WHERE
        uid = ?`,
      [comment_body, comment_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  deleteComment: (id, callback) => {
    pool.query(
      `UPDATE
        pr_comments
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

  incrementRepliesTotal: ({ replying_to, code_snippet_id }, callback) => {
    pool.query(
      `UPDATE
      pr_comments
      SET
      total_replies = total_replies + 1
      WHERE
        uid = ? AND code_snippet_id = ?`,
      [replying_to, code_snippet_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  decrementRepliesTotal: ({ replying_to, code_snippet_id }, callback) => {
    pool.query(
      `UPDATE
      pr_comments
      SET
      total_replies = total_replies - 1
      WHERE
        uid = ? AND code_snippet_id = ?`,
      [replying_to, code_snippet_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  incrementCommentVotes: ({ comment_id, step }, callback) => {
    pool.query(
      `UPDATE
      pr_comments
      SET
      votes = votes + ${step}
      WHERE
        uid = ?`,
      [comment_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  decrementCommentVotes: ({ comment_id, step }, callback) => {
    pool.query(
      `UPDATE
      pr_comments
      SET
      votes = votes - ${step}
      WHERE
        uid = ?`,
      [comment_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  commentVotes: (comment_id, callback) => {
    pool.query(
      `SELECT
        votes
      FROM
        pr_comments
      WHERE
        uid = ?`,
      [comment_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        //console.log("RESULTS TOTAL =>", results);
        return callback(null, results[0]);
      }
    );
  },
};
