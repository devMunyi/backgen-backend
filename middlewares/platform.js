const path = require('path');
const {
  checkPlatformId,
  checkPlatformsByName,
  checkIfSimilarNameExist,
} = require('../helpers/platform');

module.exports = {
  platformAddValidation: (req, res, next) => {
    let { name, added_by } = req.body;
    //console.log(req.body.name);
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Platform name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      checkPlatformsByName(name, (err, result) => {
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
            message: 'Platform name already exists',
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  platformEditValidation: (req, res, next) => {
    let { name, added_by, platform_id } = req.body;
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Platform name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      const platformId = parseInt(platform_id);
      checkIfSimilarNameExist(name, platformId, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else if (result) {
          return res.json({
            success: false,
            message: 'Platform name already exists',
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  platformIdValidation: (req, res, next) => {
    const userid = parseInt(req.body.platform_id);
    checkPlatformId(userid, (err, row) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      } else if (!row) {
        return res.json({
          success: false,
          message: 'Invalid platform id',
        });
      } else {
        next();
      }
    });
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

      const file_destination = `./public/images/platform/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else {
          //console.log("File uploaded to => ", file_destination);
          req.body.icon = sanitizedFileName;
          next();
        }
      });
    }
  },
};
