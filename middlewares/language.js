const path = require('path');
const {
  checkLanguageId,
  checkLanguagesByName,
  checkIfSimilarNameExist,
} = require('../helpers/language');

module.exports = {
  languageAddValidation: async (req, res, next) => {
    let { name, added_by } = req.body;

    name = name?.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Language name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      try {
        const results = await checkLanguagesByName(name);

        if (results.length) {
          return res.json({
            success: false,
            message: 'Language name already exists',
          });
        }

        req.body.name = name;
        next();
      } catch (error) {
        console.log(error);

        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
    }
  },

  languageEditValidation: async (req, res, next) => {
    let { name, added_by, language_id } = req.body;
    name = name?.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Language name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      const langId = parseInt(language_id);

      try {
        const results = await checkIfSimilarNameExist(name, langId);

        if (results.length) {
          return res.json({
            success: false,
            message: 'Language name already exists',
          });
        }

        req.body.name = name;

        next();
      } catch (error) {
        console.log(error);

        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
    }
  },

  languageIdValidation: async (req, res, next) => {
    const langId = parseInt(req.body.language_id);

    try {
      const row = await checkLanguageId(langId);

      if (row.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid language id',
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  validateImg: async (req, res, next) => {
    if (!req.files) {
      req.body.icon = '';
      return next();
    } else {
      const file = req.files.icon;
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

      const file_destination = `./public/images/language/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else {
          req.body.icon = sanitizedFileName;
          next();
        }
      });
    }
  },
};
