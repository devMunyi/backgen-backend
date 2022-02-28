const {
  addImplementation,
  getImplementationByImplementationId,
  getImplementations,
  updateImplementation,
  deleteImplementation,
} = require("../models/implementation");

module.exports = {
  addImplementation: (req, res) => {
    const { body } = req;
    addImplementation(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new implementation",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Implementation added Successfully",
      });
    });
  },
  getImplementationByImplementationId: (req, res) => {
    const { id } = req.params;
    getImplementationByImplementationId(parseInt(id), (err, results) => {
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
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  getImplementations: (req, res) => {
    let queryObj = {};

    let { sel_func, sel_subfunc, status, orderby, dir, offset, rpp } =
      req.query;

    if (!sel_func) {
      sel_func = 0;
    }

    if (!sel_func) {
      sel_subfunc = 0;
    }

    if (!status) {
      status = 1;
    }

    if (!orderby) {
      orderby = "title";
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
    queryObj.sel_func = parseInt(sel_func);
    queryObj.sel_subfunc = parseInt(sel_subfunc);
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getImplementations(queryObj, (err, results) => {
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
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  updateImplementation: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    updateImplementation(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update implementation",
        });
      }

      return res.json({
        success: true,
        message: "Implementation updated successfully!",
      });
    });
  },
  deleteImplementation: (req, res) => {
    const { id } = req.params;
    deleteImplementation(parseInt(id), (err, results) => {
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
        message: "Implementation deleted successfully!",
      });
    });
  },
};
