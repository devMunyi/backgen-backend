const {
  addImplementation,
  getImplementationByImplementationId,
  getImplementations,
  updateImplementation,
  deleteImplementation,
  reactivateImplementation,
  getTotalRecords,
  getTotalRecords2,
  getImplementationsByFunAndSubfun,
} = require("../models/implementation"); //require implementation models to avail its featured methods
const { inputAvailable } = require("../../helpers/common"); //require common helper functions

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

  getImplementations: (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;

    if (!where_) {
      where_ = "status = 1";
    }

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND title LIKE '%${search_}%'`;
    } else {
      andsearch = "";
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
      rpp = 100;
    }

    //add data to queryObj object
    queryObj.where_ = where_;
    queryObj.andsearch = andsearch;
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
      } else {
        //get all total records
        getTotalRecords(queryObj, (err2, results2) => {
          if (err2) {
            console.log(err2);
            return;
          }

          if (results2) {
            return res.json({
              success: true,
              all_totals: results2.all_totals,
              data: results,
            });
          }
        });
      }
    });
  },

  getImplementationsByFunAndSubfun: (req, res) => {
    const { sel_func, sel_subfunc } = req.query;

    if (!sel_func || !sel_subfunc) {
      return res.json();
    }

    let obj = {
      sel_func: parseInt(sel_func),
      sel_subfunc: parseInt(sel_subfunc),
    };

    getImplementationsByFunAndSubfun(obj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      } else {
        getTotalRecords2(obj, (err2, results2) => {
          if (err2) {
            console.log(err2);
            return;
          }

          if (results2) {
            return res.json({
              success: true,
              all_totals: results2.all_totals,
              data: results,
            });
          }
        });
      }
    });
  },

  getImplementationByImplementationId: (req, res) => {
    let { where_, implementation_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!implementation_id) {
      return res.json();
    }

    let obj = {
      where_,
      implementation_id: parseInt(implementation_id),
    };

    getImplementationByImplementationId(obj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          all_totals: 0,
          message: "Record not found",
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
    const { implementation_id } = req.body;
    updateImplementation(parseInt(implementation_id), body, (err, results) => {
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
    const { implementation_id } = req.body;
    deleteImplementation(parseInt(implementation_id), (err, results) => {
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

  reactivateImplementation: (req, res) => {
    const { implementation_id } = req.body;
    reactivateImplementation(parseInt(implementation_id), (err, results) => {
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
        message: "Implementation activated successfully",
      });
    });
  },
};
