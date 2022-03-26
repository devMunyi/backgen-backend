const { checkCommentId } = require("../helpers/comment");

module.exports = {
  commentAddValidation: (req, res, next) => {
    let { code_snippet_id, text, added_by, replies_to } = req.body;

    text = text.trim();

    if (code_snippet_id < 1) {
      return res.json({
        success: false,
        message: "Code snippet id required",
      });
    } else if (!text || text.length < 1) {
      return res.json({
        success: false,
        message: "Comment content required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (!replies_to) {
      return res.json({
        success: false,
        message: "Comment reply to is required",
      });
    } else {
      req.body.text = text;
      next();
    }
  },

  commentEditValidation: (req, res, next) => {
    let { code_snippet_id, text, added_by, replies_to, comment_id } = req.body;

    text = text.trim();

    if (!code_snippet_id) {
      return res.json({
        success: false,
        message: "Code snippet id required",
      });
    } else if (!text || text.length < 1) {
      return res.json({
        success: false,
        message: "Comment content required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (!replies_to) {
      return res.json({
        success: false,
        message: "Comment reply to is required",
      });
    } else {
      req.body.text = text;
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
