const {
  addComment,
  getCommentByCommentId,
  getComments,
  updateComment,
  deleteComment,
} = require("../models/comment");

module.exports = {
  addComment: (req, res) => {
    const { body } = req;
    addComment(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new comment",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: "Comment added Successfully",
      });
    });
  },
  getCommentByCommentId: (req, res) => {
    const { id } = req.params;
    getCommentByCommentId(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  getComments: (req, res) => {
    getComments((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  updateComment: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    updateComment(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update comment",
        });
      }

      return res.json({
        success: true,
        message: "Comment updated successfully!",
      });
    });
  },
  deleteComment: (req, res) => {
    const { id } = req.params;
    deleteComment(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Comment deleted successfully!",
      });
    });
  },
};
