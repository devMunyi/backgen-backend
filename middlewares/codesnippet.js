const {
  checkCodesnippetId,
  checkCodeAddDuplicate,
  checkCodeEditDuplicate,
} = require('../helpers/codesnippet');

const { encode } = require('html-entities');

module.exports = {
  codesnippetAddValidation: (req, res, next) => {
    let {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      lang_impl_type_id,
      user_impl_type_id,
      title,
      row_code,
      file_extension,
      instructions,
      added_by,
    } = req.body;

    func_id = parseInt(func_id);
    language_id = parseInt(language_id);
    lang_impl_type_id = parseInt(lang_impl_type_id);
    user_impl_type_id = parseInt(user_impl_type_id);
    title = encode(title.trim());
    row_code = encode(row_code.trim());
    file_extension = file_extension.trim();
    instructions = instructions.trim();
    added_by = parseInt(added_by);

    if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: 'Please select a function',
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: 'Please select a subfunction',
      });
    } else if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: 'Please select language',
      });
    } else if (!framework_id) {
      return res.json({
        success: false,
        message: 'Please select framework',
      });
    } else if (!lang_impl_type_id || lang_impl_type_id < 1) {
      return res.json({
        success: false,
        message: 'Please select language implementation type',
      });
    } else if (!user_impl_type_id || user_impl_type_id < 1) {
      return res.json({
        success: false,
        message: 'Please select your implementation type',
      });
    } else if (!title || title.length < 1) {
      return res.json({
        success: false,
        message: 'Please add a user friendly code title',
      });
    } else if (!row_code || row_code.length < 1) {
      return res.json({
        success: false,
        message: 'Code is required',
      });
    } else if (!file_extension || file_extension.length < 1) {
      return res.json({
        success: false,
        message: 'File extension used with code added is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Contributer id is required',
      });
    } else {
      checkCodeAddDuplicate(row_code, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        }
        if (result) {
          return res.json({
            success: false,
            message: 'A similar code already exists',
          });
        } else {
          //update request body with sanitized data
          req.body.func_id = func_id;
          req.body.subfunc_id = subfunc_id;
          req.body.language_id = language_id;
          req.body.framework_id = parseInt(framework_id);
          req.body.lang_impl_type_id = lang_impl_type_id;
          req.body.user_impl_type_id = user_impl_type_id;
          req.body.title = title;
          req.body.row_code = row_code;
          req.body.file_extension = file_extension;
          req.body.instructions = instructions;
          req.body.added_by = added_by;
          next();
        }
      });
    }
  },

  codesnippetEditValidation: (req, res, next) => {
    let {
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      lang_impl_type_id,
      user_impl_type_id,
      title,
      row_code,
      file_extension,
      instructions,
      added_by,
      codesnippet_id,
    } = req.body;

    //check if code edit id is present, terminate the program execution if not there
    if (!codesnippet_id) {
      return res.json({
        success: false,
        message: 'Bad request',
      });
    }

    func_id = parseInt(func_id);
    language_id = parseInt(language_id);
    lang_impl_type_id = parseInt(lang_impl_type_id);
    user_impl_type_id = parseInt(user_impl_type_id);
    title = encode(title.trim());
    row_code = encode(row_code.trim());
    file_extension = file_extension.trim();
    instructions = instructions.trim();
    added_by = parseInt(added_by);
    codesnippet_id = parseInt(codesnippet_id);

    if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: 'Please select a function',
      });
    } else if (!subfunc_id) {
      return res.json({
        success: false,
        message: 'Please select a subfunction',
      });
    } else if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: 'Please select language',
      });
    } else if (!framework_id) {
      return res.json({
        success: false,
        message: 'Please select framework',
      });
    } else if (!lang_impl_type_id || lang_impl_type_id < 1) {
      return res.json({
        success: false,
        message: 'Please select langauge implementation type',
      });
    } else if (!user_impl_type_id || user_impl_type_id < 1) {
      return res.json({
        success: false,
        message: 'Please select your implementation type',
      });
    } else if (!title || title.length < 1) {
      return res.json({
        success: false,
        message: 'Please add a user friendly code title',
      });
    } else if (!row_code || row_code.length < 1) {
      return res.json({
        success: false,
        message: 'Code is required',
      });
    } else if (!file_extension || file_extension.length < 1) {
      return res.json({
        success: false,
        message: 'File extension used with code added is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Contributer id is required',
      });
    } else {
      checkCodeEditDuplicate(row_code, codesnippet_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else if (result) {
          return res.json({
            success: false,
            message: 'A similar code already exists',
          });
        } else {
          //update request body with sanitinized data
          req.body.func_id = func_id;
          req.body.subfunc_id = subfunc_id;
          req.body.language_id = language_id;
          req.body.framework_id = parseInt(framework_id);
          req.body.lang_impl_type_id = lang_impl_type_id;
          req.body.user_impl_type_id = user_impl_type_id;
          req.body.title = title;
          req.body.row_code = row_code;
          req.body.file_extension = file_extension;
          req.body.instructions = instructions;
          req.body.added_by = added_by;
          req.body.codesnippet_id = codesnippet_id;
          next();
        }
      });
    }
  },

  codesnippetIdValidation: (req, res, next) => {
    const impId = parseInt(req.body.codesnippet_id);
    checkCodesnippetId(impId, (err, row) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      } else if (!row) {
        return res.json({
          success: false,
          message: 'Invalid code snippet id',
        });
      } else {
        next();
      }
    });
  },
};
