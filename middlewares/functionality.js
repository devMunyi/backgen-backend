const path = require("path");
const {
  checkFunId,
  checkFunsByName,
  checkIfSimilarNameExist,
} = require("../helpers/functionality");

module.exports = {
  funAddValidation: (req, res, next) => {
    const { name, added_by } = req.body;
    console.log(req.body.name);
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Functionality name is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      checkFunsByName(name, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result) {
          return res.json({
            success: false,
            message: "Functionality name already exists",
          });
        } else {
          next();
        }
      });
    }
  },

  funEditValidation: (req, res, next) => {
    const { name, added_by } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Functionality name is required",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      const funId = parseInt(req.params.id);
      checkIfSimilarNameExist(name, funId, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.status(400).json({
            success: false,
            message: "Functionality name already exists",
          });
        } else {
          next();
        }
      });
    }
  },

  funIdValidation: (req, res, next) => {
    const funId = parseInt(req.params.id);
    checkFunId(funId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.status(400).json({
          success: false,
          message: "Invalid functionality id",
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

      const file_destination = `./public/images/functionality/${sanitizedFileName}`;

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
