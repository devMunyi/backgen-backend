const path = require('path');
const {
  checkFrameworkId,
  checkFrameworksByName,
  checkIfSimilarNameExist,
} = require('../helpers/framework');

module.exports = {
  frameworkAddValidation: async (req, res, next) => {
    let { language_id, name, added_by } = req.body;
    language_id = parseInt(language_id);
    name = name?.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Framework name is required',
      });
    } else if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: 'Please select language',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      try {
        const result = await checkFrameworksByName(name);

        if (result.length) {
          return res.json({
            success: false,
            message: 'Framework name already exists',
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

  frameworkEditValidation: async (req, res, next) => {
    let { language_id, name, added_by, framework_id } = req.body;

    language_id = parseInt(language_id);

    name = name?.trim();

    if (!language_id || language_id < 1) {
      return res.json({
        success: false,
        message: 'Please select language',
      });
    } else if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Framework name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      let framId = parseInt(framework_id);

      try {
        const result = await checkIfSimilarNameExist(name, framId);

        if (result.length) {
          return res.json({
            success: false,
            message: 'Framework name already exists',
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

  frameworkIdValidation: async (req, res, next) => {
    const framId = parseInt(req.body.framework_id);

    try {
      const result = await checkFrameworkId(framId);

      if (result.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid framework id',
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

  validateImg: (req, res, next) => {
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

      const file_destination = `./public/images/framework/${sanitizedFileName}`;

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
