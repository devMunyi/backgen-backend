const { checkImplementationId } = require("../helpers/implementation");

module.exports = {
  implementationAddValidation: (req, res, next) => {
    const { func_id, subfunc_id, title, added_by } = req.body;
    if (!func_id) {
      return res.json({
        success: false,
        message: "Please select function",
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: "Please select sub-function",
      });
    } else if (!title || title.trim().length < 1) {
      return res.json({
        success: false,
        message: "Implementation title is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else {
      req.body.title = title.trim();
      next();
    }
  },

  implementationEditValidation: (req, res, next) => {
    const { func_id, subfunc_id, title, added_by } = req.body;

    if (!func_id) {
      return res.json({
        success: false,
        message: "Please select function",
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: "Please select sub-function",
      });
    } else if (!title || title.trim().length < 1) {
      return res.json({
        success: false,
        message: "Title is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else {
      req.body.title = title.trim();
      next();
    }
  },

  implementationIdValidation: (req, res, next) => {
    const impId = parseInt(req.params.id);
    checkImplementationId(impId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.json({
          success: false,
          message: "Invalid implementation id",
        });
      } else {
        next();
      }
    });
  },
};
