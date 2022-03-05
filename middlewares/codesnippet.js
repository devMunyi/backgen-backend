const { checkCodesnippetId } = require("../helpers/codesnippet");

module.exports = {
  codesnippetAddValidation: (req, res, next) => {
    let {
      row_code,
      file_extension,
      language_id,
      framework_id,
      implementation_id,
      dbms_id,
      platform_id,
      instructions,
      added_by,
    } = req.body;

    row_code = row_code.trim();
    instructions = instructions.trim();
    file_extension = file_extension.trim();
    language_id = parseInt(language_id);
    framework_id = parseInt(framework_id);
    implementation_id = parseInt(implementation_id);
    dbms_id = parseInt(dbms_id);
    platform_id = parseInt(platform_id);
    added_by = parseInt(added_by);

    if (!row_code || row_code.length < 20) {
      return res.json({
        success: false,
        message: "Code snippet is required",
      });
    } else if (!file_extension || file_extension.length < 1) {
      return res.json({
        success: false,
        message: "File extension required",
      });
    } else if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: "Please select language",
      });
    } else if (!framework_id || framework_id < 1) {
      return res.json({
        success: false,
        message: "Please select framework",
      });
    } else if (!implementation_id || implementation_id < 1) {
      return res.json({
        success: false,
        message: "Please select implementation",
      });
    } else if (!dbms_id || dbms_id < 1) {
      return res.json({
        success: false,
        message: "Please select dbms",
      });
    } else if (!platform_id || platform_id < 1) {
      return res.json({
        success: false,
        message: "Please select platform",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else {
      req.body.row_code = row_code;
      req.body.instructions = instructions;
      next();
    }
  },

  codesnippetEditValidation: (req, res, next) => {
    let {
      row_code,
      file_extension,
      language_id,
      framework_id,
      implementation_id,
      dbms_id,
      platform_id,
      instructions,
      added_by,
    } = req.body;

    row_code = row_code.trim();
    instructions = instructions.trim();
    file_extension = file_extension.trim();
    language_id = parseInt(language_id);
    framework_id = parseInt(framework_id);
    implementation_id = parseInt(implementation_id);
    dbms_id = parseInt(dbms_id);
    platform_id = parseInt(platform_id);
    added_by = parseInt(added_by);

    if (!row_code || row_code.length < 20) {
      return res.json({
        success: false,
        message: "Code snippet is required",
      });
    } else if (!file_extension || file_extension.length < 1) {
      return res.json({
        success: false,
        message: "File extension required",
      });
    } else if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: "Please select language",
      });
    } else if (!framework_id || framework_id < 1) {
      return res.json({
        success: false,
        message: "Please select framework",
      });
    } else if (!implementation_id || implementation_id < 1) {
      return res.json({
        success: false,
        message: "Please select implementation",
      });
    } else if (!dbms_id || dbms_id < 1) {
      return res.json({
        success: false,
        message: "Please select dbms",
      });
    } else if (!platform_id || platform_id < 1) {
      return res.json({
        success: false,
        message: "Please select platform",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else {
      req.body.row_code = row_code;
      req.body.instructions = instructions;
      next();
    }
  },

  codesnippetIdValidation: (req, res, next) => {
    const impId = parseInt(req.params.id);
    checkCodesnippetId(impId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.json({
          success: false,
          message: "Invalid code snippet id",
        });
      } else {
        next();
      }
    });
  },
};
