const pool = require("../../config/db.config"); //require database configurations for CRUD operations
module.exports = {
  addUpvote: ({ post_id, table, user_id, upvote }, callback) => {
    pool.query(
      `INSERT INTO
          pr_votes(post_id, ref_table, user_id, upvote)
        VALUES
          (?, ?, ?, ?)`,
      [post_id, table, user_id, upvote],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  addDownvote: ({ post_id, table, user_id, upvote }, callback) => {
    pool.query(
      `INSERT INTO
          pr_votes(post_id, ref_table, user_id, downvote)
        VALUES
          (?, ?, ?, ?)`,
      [post_id, table, user_id, upvote],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateUpvote: ({ upvote, post_id, user_id, table }, callback) => {
    pool.query(
      `UPDATE
          pr_votes
        SET
          upvote = ?
        WHERE
        post_id = ? AND ref_table = ? AND user_id = ?`,
      [upvote, post_id, table, user_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  updateDownvote: ({ downvote, post_id, user_id, table }, callback) => {
    pool.query(
      `UPDATE
          pr_votes
        SET
        downvote = ?
        WHERE
        post_id = ? AND ref_table = ? AND user_id = ?`,
      [downvote, post_id, table, user_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  voteCheckByPostIdUserIdAndTable: ({ table, post_id, user_id }, callback) => {
    try {
      pool.query(
        `
        SELECT
         upvote,
         downvote
        FROM
          pr_votes
        WHERE ref_table = ? AND post_id = ? AND user_id = ? LIMIT 1`,
        [table, post_id, user_id],
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

  getVotes: (callback) => {
    pool.query(
      `SELECT
          post_id,
          ref_table,
          user_id,
          upvote,
          downvote
        FROM
          pr_votes`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
