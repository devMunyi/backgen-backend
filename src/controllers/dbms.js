const {
  addDbms,
  getDbmsByDbmsId,
  getDbmses,
  updateDbms,
  deleteDbms,
} = require("../models/dbms");

module.exports = {
  addDbms: (req, res) => {
    const { body } = req;

    addDbms(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new dbms",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Dbms added Successfully",
      });
    });
  },
  getDbmsByDbmsId: (req, res) => {
    const { dbms_id } = req.query;

    if(!dbms_id){
      return;
    }

    getDbmsByDbmsId(parseInt(dbms_id), (err, results) => {
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
        results.icon = `images/dbms/${icon}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getDbmses: (req, res) => {
    //intialize an empty object
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

    //add data to fObj object
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getDbmses(queryObj, (err, results) => {
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
          const icon = `images/dbms/${result.icon}`;
          result.icon = icon;
          console.log(result);
        });

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  updateDbms: (req, res) => {
    const { body } = req;

    const { dbms_id } = req.body;
    updateDbms(parseInt(dbms_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update dbms",
        });
      }

      if (results) {
        return res.json({
          success: true,
          message: "Dbms updated successfully!",
        });
      }
    });
  },
  deleteDbms: (req, res) => {
    const { dbms_id } = req.body;
    deleteDbms(parseInt(dbms_id), (err, results) => {
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
        message: "Dbms deleted successfully!",
      });
    });
  },
};
