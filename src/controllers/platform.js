const { addListener } = require("../../config/db.config");
const {
  addPlatform,
  getPlatformByPlatformId,
  getPlatforms,
  updatePlatform,
  deletePlatform,
} = require("../models/platform");

module.exports = {
  addPlatform: (req, res) => {
    const { body } = req;

    addPlatform(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new platform",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: "Platform added Successfully",
      });
    });
  },
  getPlatformByPlatformId: (req, res) => {
    const { id } = req.params;
    getPlatformByPlatformId(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not found",
        });
      }
      if (results) {
        const { icon } = results;
        results.icon = `images/platform/${icon}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getPlatforms: (req, res) => {
    let queryObj = {};

    let { status, orderby, dir, offset, rpp } = req.query;

    if (!status) {
      status = 1;
    }
    if (!orderby) {
      orderby = "name";
    }
    if (!dir) {
      dir = "ASC";
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    //add data to queryObj object
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    getPlatforms(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }

      if (results) {
        results.map((result) => {
          const icon = `images/platform/${result.icon}`;
          result.icon = icon;
        });

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  updatePlatform: (req, res) => {
    const { body } = req;

    const { id } = req.params;
    updatePlatform(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update platform",
        });
      }

      return res.json({
        success: true,
        message: "Platform updated successfully!",
      });
    });
  },
  deletePlatform: (req, res) => {
    const { id } = req.params;
    deletePlatform(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Platform deleted successfully!",
      });
    });
  },
};
