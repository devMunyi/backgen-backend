const path = require('path');
//const imageThumbnail = require("image-thumbnail");
const fs = require('fs');

const {
  checkCountryId,
  checkCountriesByName,
  checkIfSimilarNameExist,
} = require('../helpers/country');

module.exports = {
  countryAddValidation: async (req, res, next) => {
    let { name, abbrev, added_by } = req.body;
    name = name?.trim();
    abbrev = abbrev?.trim();

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
      try {
        const result = await checkCountriesByName(name);

        if (result.length) {
          return res.json({
            success: false,
            message: 'Country name already exists',
          });
        }

        req.body.name = name;
        const abbrev_ = abbrev.toUpperCase();
        req.body.abbrev = abbrev_;

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

  countryEditValidation: async (req, res, next) => {
    let { name, abbrev, added_by, country_id } = req.body;

    name = name?.trim();
    abbrev = abbrev?.trim();

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
      country_id = parseInt(country_id);

      try {
        const result = await checkIfSimilarNameExist(name, country_id);

        if (result.length) {
          return res.json({
            success: false,
            message: 'Country name already exists',
          });
        }

        req.body.name = name;
        const abbrev_ = abbrev.toUpperCase();
        req.body.abbrev = abbrev_;

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

  countryIdValidation: async (req, res, next) => {
    let countryId = parseInt(req.body.country_id);

    try {
      const result = await checkCountryId(countryId);

      if (result.length === 0) {
        return res.json({
          success: false,
          message: 'Invalid country id',
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
