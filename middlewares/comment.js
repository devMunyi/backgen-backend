const { checkCommentId } = require("../helpers/comment");

module.exports = {
  commentAddValidation: (req, res, next) => {
    let { code_snippet_id, comment_body, added_by, replying_to } = req.body;
    comment_body = comment_body.trim();

    if (code_snippet_id < 1) {
      return res.json({
        success: false,
        message: "Code snippet id required",
      });
    } else if (!comment_body || comment_body.length < 1) {
      return res.json({
        success: false,
        message: "Comment content required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (replying_to < 0) {
      return res.json({
        success: false,
        message: "Reply to is required",
      });
    } else {
      req.body.comment_body = comment_body;
      next();
    }
  },

  commentEditValidation: (req, res, next) => {
    let { comment_body, comment_id } = req.body;
    comment_id = parseInt(comment_id);
    comment_body = comment_body.trim();

    if (!comment_id || comment_id < 1) {
      return res.json({
        success: false,
        message: "Comment id is required",
      });
    } else if (!comment_body || comment_body.length < 1) {
      return res.json({
        success: false,
        message: "Comment content is required",
      });
    } else {
      req.body.comment_body = comment_body;
      req.body.comment_id = comment_id;
      next();
    }
  },

  commentIdValidation: (req, res, next) => {
    const comment_id = req.body.comment_id;
    console.log("COMMENNT ID =>", comment_id);
    checkCommentId(comment_id, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.json({
          success: false,
          message: "Invalid comment id",
        });
      } else {
        next();
      }
    });
  },
};
