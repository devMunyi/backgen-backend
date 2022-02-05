const path = require("path");

const {
  checkCountryId,
  checkCountriesByName,
  checkIfSimilarNameExist,
} = require("../helpers/country");

module.exports = {
  countryAddValidation: (req, res, next) => {
    const { name, abbrev, added_by } = req.body;
    console.log(req.body.name);
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Country name is required",
      });
    } else if (!abbrev || abbrev.length != 3) {
      return res.json({
        success: false,
        message: "Abbreviation is required and should be 3 characters only",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      checkCountriesByName(name, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result) {
          return res.json({
            success: false,
            message: "Country name already exists",
          });
        } else {
          const abbrev_ = abbrev.toUpperCase();
          req.body.abbrev = abbrev_;
          next();
        }
      });
    }
  },

  countryEditValidation: (req, res, next) => {
    const { name, abbrev, added_by } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Country name is required",
      });
    } else if (!abbrev || abbrev.length != 3) {
      return res.json({
        success: false,
        message: "Abbreviation is required and should be 3 characters only",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      const countryId = parseInt(req.params.id);
      checkIfSimilarNameExist(name, countryId, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.status(400).json({
            success: false,
            message: "Country name already exists",
          });
        } else {
          const abbrev_ = abbrev.toUpperCase();
          req.body.abbrev = abbrev_;
          next();
        }
      });
    }
  },

  countryIdValidation: (req, res, next) => {
    const countryId = parseInt(req.params.id);
    checkCountryId(countryId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.status(400).json({
          success: false,
          message: "Invalid country id",
        });
      } else {
        next();
      }
    });
  },

  validateImg: (req, res, next) => {
    if (!req.files) {
      req.body.flag = "";
      return next();
    } else {
      const file = req.files.flag;
      const fileName = file.name;
      const fileSize = file.size;
      const miniFileSize = 1024 * 1024 * 5;
      const extensionName = path.extname(fileName);
      const allowedExtensions = [".png", ".jpg", "jpeg"];

      if (!allowedExtensions.includes(extensionName)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid image. Only .jpeg, .jpg and .png file types are allowed",
        });
      } else if (fileSize > miniFileSize) {
        return res.status(400).json({
          success: false,
          message: "File size exceeds minimum required 5mbs",
        });
      }
      const sanitizedFileName =
        fileName.toLowerCase().slice(0, -4) +
        "-" +
        Date.now() +
        path.extname(fileName);

      const file_destination = `./public/images/country/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          console.log("File uploaded to => ", file_destination);
          req.body.flag = sanitizedFileName;
          next();
        }
      });
    }
  },
};
