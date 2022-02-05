const { checkCommentId } = require("../helpers/comment");

module.exports = {
  commentAddValidation: (req, res, next) => {
    const { code_snippet_id, text, added_by, replies_to } = req.body;
    if (!code_snippet_id) {
      return res.status(400).json({
        success: false,
        message: "Code snippet id required",
      });
    } else if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment content required",
      });
    } else if (!added_by) {
      return res.status(400).json({
        success: false,
        message: "Author is required",
      });
    } else if (!replies_to) {
      return res.json({
        success: false,
        message: "Comment reply to is required",
      });
    } else {
      next();
    }
  },

  commentEditValidation: (req, res, next) => {
    const { code_snippet_id, text, added_by, replies_to } = req.body;

    if (!code_snippet_id) {
      return res.status(400).json({
        success: false,
        message: "Code snippet id required",
      });
    } else if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment content required",
      });
    } else if (!added_by) {
      return res.status(400).json({
        success: false,
        message: "Author is required",
      });
    } else if (!replies_to) {
      return res.json({
        success: false,
        message: "Comment reply to is required",
      });
    } else {
      next();
    }
  },

  commentIdValidation: (req, res, next) => {
    const cmId = parseInt(req.params.id);
    checkCommentId(cmId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.status(400).json({
          success: false,
          message: "Invalid comment id",
        });
      } else {
        next();
      }
    });
  },
};
