const {
  addFramework,
  getFrameworkByFrameworkId,
  getFrameworks,
  updateFramework,
  deleteFramework,
} = require("../models/framework");

module.exports = {
  addFramework: (req, res) => {
    const { body } = req;

    addFramework(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new framework",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Framework added Successfully",
      });
    });
  },
  getFrameworkByFrameworkId: (req, res) => {
    const { id } = req.params;
    getFrameworkByFrameworkId(parseInt(id), (err, results) => {
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
        results.icon = `images/framework/${icon}`;
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getFrameworks: (req, res) => {
    let queryObj = {};

    let { language_id, status, orderby, dir, offset, rpp } = req.query;

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

    //add data to fObj object
    queryObj.language_id = parseInt(language_id);
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getFrameworks(queryObj, (err, results) => {
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
          const icon = `images/framework/${result.icon}`;
          result.icon = icon;
          //console.log(result);
        });
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  updateFramework: (req, res) => {
    const { body } = req;

    const { id } = req.params;
    updateFramework(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update framework",
        });
      }

      return res.json({
        success: true,
        message: "Framework updated successfully!",
      });
    });
  },
  deleteFramework: (req, res) => {
    const { id } = req.params;
    deleteFramework(parseInt(id), (err, results) => {
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
        message: "Framework deleted successfully!",
      });
    });
  },
};
