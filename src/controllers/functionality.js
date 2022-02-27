const {
  addFunc,
  getFuncByFuncId,
  getFuncs,
  updateFunc,
  deleteFunc,
} = require("../models/functionality");

module.exports = {
  addFunc: (req, res) => {
    const { body } = req;

    addFunc(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new functionality",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: "Functionality added Successfully",
      });
    });
  },
  getFuncByFuncId: (req, res) => {
    const { id } = req.params;
    getFuncByFuncId(parseInt(id), (err, results) => {
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
        results.icon = `/images/functionality/${icon}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getFuncs: (req, res) => {
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
    getFuncs(queryObj, (err, results) => {
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
          const icon = `/images/functionality/${result.icon}`;
          result.icon = icon;

          // const fun_icon = `images/functionality/${result.fun_icon}`;
          // result.fun_icon = fun_icon;

          // const subfun_icon = `images/subfunctionality/${result.subfun_icon}`;
          // result.subfun_icon = subfun_icon;

          //console.log(result);
        });

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  updateFunc: (req, res) => {
    const { body } = req;

    const { id } = req.params;
    updateFunc(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update functionality",
        });
      }

      return res.json({
        success: true,
        message: "Functionality updated successfully!",
      });
    });
  },
  deleteFunc: (req, res) => {
    const { id } = req.params;
    deleteFunc(parseInt(id), (err, results) => {
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
        message: "Functionality deleted successfully!",
      });
    });
  },
};
