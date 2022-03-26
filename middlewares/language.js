const path = require("path");
const {
  checkLanguageId,
  checkLanguagesByName,
  checkIfSimilarNameExist,
} = require("../helpers/language");

module.exports = {
  languageAddValidation: (req, res, next) => {
    let { name, added_by } = req.body;
    //console.log(req.body.name);
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: "Language name is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      checkLanguagesByName(name, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result) {
          return res.json({
            success: false,
            message: "Language name already exists",
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  languageEditValidation: (req, res, next) => {
    let { name, added_by, language_id } = req.body;
    name = name.trim();

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: "Language name is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      const langId = parseInt(language_id);
      checkIfSimilarNameExist(name, langId, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.json({
            success: false,
            message: "Language name already exists",
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  languageIdValidation: (req, res, next) => {
    const langId = parseInt(req.body.language_id);
    checkLanguageId(langId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.json({
          success: false,
          message: "Invalid language id",
        });
      } else {
        next();
      }
    });
  },

  validateImg: (req, res, next) => {
    if (!req.files) {
      req.body.icon = "";
      return next();
    } else {
      const file = req.files.icon;
      const fileName = file.name;
      const fileSize = file.size;
      const miniFileSize = 1024 * 1024 * 5;
      const extensionName = path.extname(fileName);
      const allowedExtensions = [".png", ".jpg", "jpeg"];

      if (!allowedExtensions.includes(extensionName)) {
        return res.json({
          success: false,
          message:
            "Invalid image. Only .jpeg, .jpg and .png file types are allowed",
        });
      } else if (fileSize > miniFileSize) {
        return res.json({
          success: false,
          message: "File size exceeds minimum required 5mbs",
        });
      }
      const sanitizedFileName =
        fileName.toLowerCase().slice(0, -4) +
        "-" +
        Date.now() +
        path.extname(fileName);

      const file_destination = `./public/images/language/${sanitizedFileName}`;

      file.mv(file_destination, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          //console.log("File uploaded to => ", file_destination);
          req.body.icon = sanitizedFileName;
          next();
        }
      });
    }
  },
};
