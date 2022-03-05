const path = require("path");
const {
  checkSubfunsByName,
  checkSubfunId,
  checkIfSimilarNameExist,
} = require("../helpers/subfunctionality");

module.exports = {
  subfunAddValidation: (req, res, next) => {
    let { name, func_id, added_by } = req.body;

    name = name.trim();
    func_id = parseInt(func_id);

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: "Subfunctionality name is required",
      });
    } else if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: "Please select functionality",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      checkSubfunsByName(name, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (result) {
          return res.json({
            success: false,
            message: "Subfunctionality name already exists",
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  subfunEditValidation: (req, res, next) => {
    let { func_id, name, added_by } = req.body;

    name = name.trim();
    func_id = parseInt(func_id);

    if (!name || name.length < 1) {
      return res.json({
        success: false,
        message: "Subfunctionality name is required",
      });
    } else if (!func_id || func_id < 1) {
      return res.json({
        success: false,
        message: "Please select functionality",
      });
    } else if (!added_by) {
      return res.json({
        success: false,
        message: "Author is required",
      });
    } else if (name.length > 0) {
      const subfunId = parseInt(req.params.id);
      checkIfSimilarNameExist(name, subfunId, (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result) {
          return res.json({
            success: false,
            message: "Subfunctionality name already exists",
          });
        } else {
          req.body.name = name;
          next();
        }
      });
    }
  },

  subfunIdValidation: (req, res, next) => {
    const subfunId = parseInt(req.params.id);
    checkSubfunId(subfunId, (err, row) => {
      if (err) {
        console.log(err);
      } else if (!row) {
        return res.json({
          success: false,
          message: "Invalid subfunctionality id",
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

      const file_destination = `./public/images/subfunctionality/${sanitizedFileName}`;

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
