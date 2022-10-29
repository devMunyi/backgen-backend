const path = require('path');
const {
  checkDbmsId,
  checkDbmsesByName,
  checkIfSimilarNameExist,
} = require('../helpers/dbms');

module.exports = {
  dbmsAddValidation: (req, res, next) => {
    let { name, added_by } = req.body;
    //console.log(req.body.name);
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Dbms name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      checkDbmsesByName(name, (err, result) => {
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
            message: 'Dbms name already exists',
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  dbmsEditValidation: (req, res, next) => {
    let { name, added_by, dbms_id } = req.body;
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Dbms name is required',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      dbms_id = parseInt(dbms_id);
      checkIfSimilarNameExist(name, dbms_id, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else if (result) {
          return res.json({
            success: false,
            message: 'Dbms name already exists',
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  dbmsIdValidation: (req, res, next) => {
    const dbmsId = parseInt(req.body.dbms_id);
    checkDbmsId(dbmsId, (err, row) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      } else if (!row) {
        return res.json({
          success: false,
          message: 'Invalid dbms id',
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

      const file_destination = `./public/images/dbms/${sanitizedFileName}`;

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
