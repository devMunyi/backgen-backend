const path = require('path');
const {
  checkSubfunsByName,
  checkSubfunId,
  checkIfSimilarNameExist,
} = require('../helpers/subfunctionality');

module.exports = {
  subfunAddValidation: async (req, res, next) => {
    let { name, func_id, added_by } = req.body;

    name = name?.trim();

    func_id = parseInt(func_id);

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Subfunctionality name is required',
      });
    } else if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: 'Please select functionality',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      try {
        const result = await checkSubfunsByName(name);

        if (result.length) {
          return res.json({
            success: false,
            message: 'Subfunctionality name already exists',
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

  subfunEditValidation: async (req, res, next) => {
    let { func_id, name, added_by, subfun_id } = req.body;

    name = name?.trim();

    func_id = parseInt(func_id);

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Subfunctionality name is required',
      });
    } else if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: 'Please select functionality',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      try {
        const result = await checkIfSimilarNameExist(name, parseInt(subfun_id));

        if (result.length) {
          return res.json({
            success: false,
            message: 'Subfunctionality name already exists',
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

  subfunIdValidation: async (req, res, next) => {
    const subfunId = parseInt(req.body.subfun_id);

    try {
      const result = await checkSubfunId(subfunId);

      if (result.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid subfunctionality id',
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

      const file_destination = `./public/images/subfunctionality/${sanitizedFileName}`;

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
