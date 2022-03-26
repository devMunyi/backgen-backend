const {
  addSubfunc,
  getSubfuncBySubfuncId,
  getSubfuncs,
  updateSubfunc,
  deleteSubfunc,
  reactivateSubfunc,
} = require("../models/subfunctionality");

module.exports = {
  addSubfunc: (req, res) => {
    const { body } = req;

    addSubfunc(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Error occured in adding a new sub-functionality",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Sub-functionality added Successfully",
      });
    });
  },
  getSubfuncBySubfuncId: (req, res) => {
    let obj = {};

    let { status, orStatus } = req.query;

    if (!status) {
    } else {
      obj.status = parseInt(status);
    }

    if (!orStatus) {
    } else {
      obj.orStatus = parseInt(orStatus);
    }

    const { subfun_id } = req.query;

    if(!subfun_id){
      return;
    }

    getSubfuncBySubfuncId(parseInt(subfun_id), obj, (err, results) => {
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
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getSubfuncs: (req, res) => {
    let queryObj = {};
    let { status, orStatus, orderby, dir, offset, rpp } = req.query;

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
    if (!orStatus) {
    } else {
      queryObj.orStatus = parseInt(orStatus);
    }
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    getSubfuncs(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        console.log(queryObj);
        console.log(results);
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }

      if (results) {
        // results.map((result) => {
        //   const icon = `/images/subfunctionality/${result.icon}`;
        //   result.icon = icon;
        //   //console.log(result);
        // });

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  updateSubfunc: (req, res) => {
    const { body } = req;

    const { subfun_id } = req.body;

    updateSubfunc(parseInt(subfun_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update sub-functionality",
        });
      }

      return res.json({
        success: true,
        message: "Sub-functionality updated successfully",
      });
    });
  },
  deleteSubfunc: (req, res) => {
    const { subfun_id } = req.body;
    deleteSubfunc(parseInt(subfun_id), (err, results) => {
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
        message: "Sub-functionality deleted successfully",
      });
    });
  },

  reactivateSubfunc: (req, res) => {
    const { subfun_id } = req.body;
    reactivateSubfunc(parseInt(subfun_id), (err, results) => {
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
        message: "Sub-functionality activated successfully",
      });
    });
  },
};
