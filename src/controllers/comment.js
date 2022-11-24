const path = require('path');
const {
  addComment,
  getCommentByCommentId,
  getComments,
  updateComment,
  deleteComment,
  getCommentsByCodesnippetId,
  commentVotes,
} = require('../models/comment'); // require comment models to avail its featured methods

const {
  totalRecords,
  incrementCounter,
  decrementCounter,
} = require('../models/common');
const {
  addUpvote,
  addDownvote,
  updateUpvote,
  updateDownvote,
  voteCheckByPostIdUserIdAndTable,
} = require('../models/votes');

module.exports = {
  addComment: async (req, res) => {
    const { body } = req;

    try {
      await addComment(body);

      let { code_snippet_id, replying_to } = body;

      if (replying_to == 0) {
        // its a new comment for codesnippet
        // increment total_comments in the pr_code_snippets table
        await incrementCounter({
          uid: code_snippet_id,
          table: 'pr_code_snippets',
          field: 'total_comments',
        });
      }

      if (replying_to > 0) {
        // its a reply to a comment
        // increment total_replies in the pr_code_snippets table
        await incrementCounter({
          uid: replying_to,
          table: 'pr_comments',
          field: 'total_replies',
        });
      }

      return res.json({
        success: true,
        message: 'Added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new comment',
      });
    }
  },

  getCommentByCommentId: async (req, res) => {
    const { comment_id } = req.query;

    if (!comment_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    try {
      const results = await getCommentByCommentId(parseInt(comment_id));

      return res.json({
        success: true,
        data: results[0],
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  getComments: async (req, res) => {
    try {
      const results = await getComments();

      return res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  updateComment: async (req, res) => {
    const { body } = req;

    try {
      const result = await updateComment(body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteComment: async (req, res) => {
    const { comment_id } = req.body;

    const { replying_to, code_snippet_id } = req.query;

    try {
      const result = await deleteComment(parseInt(comment_id));

      if (replying_to == 0) {
        // decrement total_comments in the pr_code_snippets table
        await decrementCounter({
          uid: code_snippet_id,
          table: 'pr_code_snippets',
        });
      }

      if (replying_to > 0) {
        // decrement total_replies in the pr_comments table
        await decrementCounter({
          uid: replying_to,
          table: 'pr_comments',
        });
      }

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Deleted Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  getCommentsByCodesnippetId: async (req, res) => {
    let queryObj = {};
    let { where_, orderby, dir, offset, rpp } = req.query;

    if (!where_) {
      return res.json({
        success: false,
        message: 'Code snippet id required!',
      });
    }

    if (!orderby) {
      orderby = 'cmt.uid';
    }
    if (!dir) {
      dir = 'DESC';
    }
    if (!(offset >= 0)) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 5;
    }

    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    console.log('where clause=> ', where_);

    try {
      const results = await getCommentsByCodesnippetId(queryObj);

      // get total comments
      const { total_comments: total_records } = await totalRecords({
        table: 'pr_comments cmt',
        field: 'cmt.uid',
        where_,
        desiredName: 'total_comments',
      });

      return res.json({
        success: true,
        total_records,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  upvoteComment: async (req, res) => {
    const { post_id } = req.body;

    const { body } = req;

    // check if the vote is already casted

    try {
      const result = await voteCheckByPostIdUserIdAndTable(body);

      if (result.length === 0) {
        body.upvote = 1;

        // means user has not upvoted or downvoted before, hence record his vote
        await addUpvote(body);

        // increment comment votes identified with post_id by 1
        await incrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // if upvote = 0 => downvote = -1, meaning user now intends to revert the downvote and upvote instead
      if (result.length && result[0].upvote == 0 && result[0].downvote == -1) {
        body.downvote = 0;

        body.upvote = 1;

        await updateUpvote(body);

        // now revert the downvote
        await updateDownvote(body);

        // increment votes count by 2
        await incrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 2,
        });
      }

      // if upvote = 1 => downvote = 0, meaning user now intends to revert the upvote
      if (result.length && result[0].upvote == 1 && result[0].downvote == 0) {
        body.upvote = 0;

        // update upvotes
        await updateUpvote(body);

        // decrement votes by 1
        await decrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // if upvote = 0 => downvote = 0, meaning user intends to upvote
      if (result.length && result[0].upvote == 0 && result[0].downvote == 0) {
        body.upvote = 1;
        // update upvote
        await updateUpvote(body);

        // increment comment votes by 1
        await incrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // now get the updated votes
      const { votes } = await commentVotes(post_id);

      return res.json({
        success: true,
        message: 'Upvote recorded',
        votes,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  downvoteComment: async (req, res) => {
    const { post_id } = req.body;

    const { body } = req;

    try {
      // check if the vote is already casted
      const result = await voteCheckByPostIdUserIdAndTable(body);

      // when db result.length equal to zero will mean not vote record seen, thus can be recorded
      if (result.length === 0) {
        body.downvote = -1;
        // add a downvote
        await addDownvote(body);

        // decrement votes for comment identified with variable post_id by 1
        await decrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // if downvote = 0 => upvote = 1, meaning user now intends to revert the upvote and downvote instead
      if (result[0].downvote == 0 && result[0].upvote == 1) {
        body.upvote = 0;
        body.downvote = -1;

        // update downvote
        await updateDownvote(body);

        // now revert the downvote
        await updateUpvote(body);

        // decrement comment votes
        await decrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 2,
        });
      }

      // if downvote = -1 => upvote = 0, meaning user now intends to revert the downvote
      if (result[0].downvote == -1 && result[0].upvote == 0) {
        body.downvote = 0;

        // update downvote
        await updateDownvote(body);

        // increment comment votes
        await incrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // if upvote = 0 => downvote = 0, meaning user intends to downvote
      if (result[0].upvote == 0 && result[0].downvote == 0) {
        body.downvote = -1;

        // update downvote
        await updateDownvote(body);

        // decrement comment votes

        await decrementCounter({
          uid: post_id,
          table: 'pr_comments',
          field: 'votes',
          step: 1,
        });
      }

      // now get the updated votes
      const { votes } = await commentVotes(post_id);

      // return response
      return res.json({
        success: true,
        message: 'Downvote recorded',
        votes,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  uploadImg: (req, res) => {
    if (!req.files) {
      return res.json({ success: false, message: 'File not found' });
    } else {
      const file = req.files.upload;
      const fileName = file.name;
      const fileSize = file.size;
      const miniFileSize = 1024 * 1024 * 5;
      const extensionName = path.extname(fileName);
      const allowedExtensions = ['.png', '.jpg', 'jpeg'];

      if (!allowedExtensions.includes(extensionName)) {
        return res.json({
          success: false,
          message:
            'Invalid image. Only .jpeg, .jpg and .png file types are allowed',
        });
      } else if (fileSize > miniFileSize) {
        return res.json({
          success: false,
          message: 'File size exceeds minimum required 5mbs',
        });
      }
      const sanitizedFileName =
        fileName.toLowerCase().slice(0, -4) +
        '-' +
        Date.now() +
        path.extname(fileName);

      const file_destination = `./public/images/other/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else {
          url = `${process.env.SERVER_URL}/images/other/${sanitizedFileName}`;
          return res.json({ success: true, url });
        }
      });
    }
  },
};
