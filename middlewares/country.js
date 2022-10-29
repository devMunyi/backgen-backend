const path = require('path');
//const imageThumbnail = require("image-thumbnail");
const fs = require('fs');

const {
  checkCountryId,
  checkCountriesByName,
  checkIfSimilarNameExist,
} = require('../helpers/country');

module.exports = {
  countryAddValidation: (req, res, next) => {
    let { name, abbrev, added_by } = req.body;
    //console.log(req.body.name);
    name = name.trim();
    abbrev = abbrev.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Country name is required',
      });
    } else if (!abbrev || abbrev.length != 3) {
      return res.json({
        success: false,
        message: 'Abbreviation is required and should be 3 characters only',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      checkCountriesByName(name, (err, result) => {
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
            message: 'Country name already exists',
          });
        } else {
          req.body.name = name;
          const abbrev_ = abbrev.toUpperCase();
          req.body.abbrev = abbrev_;
          next();
        }
      });
    }
  },

  countryEditValidation: (req, res, next) => {
    let { name, abbrev, added_by, country_id } = req.body;

    name = name.trim();
    abbrev = abbrev.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: 'Country name is required',
      });
    } else if (!abbrev || abbrev.length != 3) {
      return res.json({
        success: false,
        message: 'Abbreviation is required and should be 3 characters only',
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: 'Author is required',
      });
    } else if (name.length > 0) {
      countryId = parseInt(country_id);
      checkIfSimilarNameExist(name, countryId, (err, result) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else if (result) {
          return res.json({
            success: false,
            message: 'Country name already exists',
          });
        } else {
          req.body.name = name;
          const abbrev_ = abbrev.toUpperCase();
          req.body.abbrev = abbrev_;
          next();
        }
      });
    }
  },

  countryIdValidation: (req, res, next) => {
    let countryId = parseInt(req.body.country_id);
    checkCountryId(countryId, (err, row) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      } else if (!row) {
        return res.json({
          success: false,
          message: 'Invalid country id',
        });
      } else {
        next();
      }
    });
  },

  validateImg: async (req, res, next) => {
    if (!req.files) {
      req.body.flag = '';
      return next();
    } else {
      const file = req.files.flag;
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

      const file_destination = `public/images/country/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: 'Something went wrong. Try again later',
          });
        } else {
          req.body.flag = sanitizedFileName;
          next();
        }
      });
    }
  },
};
