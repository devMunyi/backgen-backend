// require database configurations for CRUD operations
const pool = require('../../config/db.config');

module.exports = {
  addUpvote: async ({ post_id, table, user_id, upvote = 1 }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
            pr_votes(post_id, ref_table, user_id, upvote)
          VALUES
            (?, ?, ?, ?)`,
        [post_id, table, user_id, upvote]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  addDownvote: async ({ post_id, table, user_id, downvote = -1 }) => {
    try {
      const results = await pool.query(
        `INSERT INTO
            pr_votes(post_id, ref_table, user_id, downvote)
          VALUES
            (?, ?, ?, ?)`,
        [post_id, table, user_id, downvote]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateUpvote: async ({ upvote, post_id, user_id, table }) => {
    try {
      const results = await pool.query(
        `UPDATE
            pr_votes
          SET
            upvote = ?
          WHERE
          post_id = ? AND ref_table = ? AND user_id = ?`,
        [upvote, post_id, table, user_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  updateDownvote: async ({ downvote, post_id, user_id, table }) => {
    try {
      const results = await pool.query(
        `UPDATE
            pr_votes
          SET
          downvote = ?
          WHERE
          post_id = ? AND ref_table = ? AND user_id = ?`,
        [downvote, post_id, table, user_id]
      );

      return results[0];
    } catch (error) {
      throw error;
    }
  },

  voteCheckByPostIdUserIdAndTable: async ({ table, post_id, user_id }) => {
    try {
      const result = await pool.query(
        `
        SELECT
         upvote,
         downvote
        FROM
          pr_votes
        WHERE ref_table = ? AND post_id = ? AND user_id = ? LIMIT 1`,
        [table, post_id, user_id]
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },

  getVotes: async () => {
    try {
      const result = await pool.query(
        `SELECT
            post_id,
            ref_table,
            user_id,
            upvote,
            downvote
          FROM
            pr_votes`,
        []
      );

      return result[0];
    } catch (error) {
      throw error;
    }
  },
};
