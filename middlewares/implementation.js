const { checkImplementationId } = require("../helpers/implementation");

module.exports = {
  implementationAddValidation: (req, res, next) => {
    let { func_id, subfunc_id, title, added_by } = req.body;

    title = title.trim();
    func_id = parseInt(func_id);

    if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: "Please select function",
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: "Please select sub-function",
      });
    } else if (!title || title.length < 1) {
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
      req.body.title = title;
      next();
    }
  },

  implementationEditValidation: (req, res, next) => {
    let { func_id, subfunc_id, title, added_by, implementation_id } = req.body;

    title = title.trim();
    func_id = parseInt(func_id);

    if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: "Please select function",
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: "Please select sub-function",
      });
    } else if (!title || title.length < 1) {
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
      req.body.title = title;
      next();
    }
  },

  implementationIdValidation: (req, res, next) => {
    const impId = parseInt(req.body.implementation_id);
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
