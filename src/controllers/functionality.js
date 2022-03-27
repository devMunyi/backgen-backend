const {
  addFunc,
  getFuncByFuncId,
  getFuncs,
  updateFunc,
  deleteFunc,
  reactivateFunc,
  getTotalRecords,
} = require("../models/functionality");

const {inputAvailable} = require("../../helpers/common");

module.exports = {
  addFunc: (req, res) => {
    const { body } = req;

    addFunc(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: "Error occured in adding a new functionality",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Functionality added Successfully",
      });
    });
  },

  getFuncs: (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;
    if (!where_) {
      where_ = "status = 1";
    }
    
    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND name LIKE '%${search_}%'`;
    } else {
      andsearch = "";
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
    queryObj.where_ = where_;
    queryObj.andsearch = andsearch;
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
        });

        //get all total records
        getTotalRecords(queryObj, (err2, results2) => {
          if(err2){
            console.log(err2)
            return;
          }

          if (results2) {
            return res.json({
              success: true,
              all_totals:results2.all_totals,
              data: results,
            });
          }
        });
      }
    });
  },


  getFuncByFuncId: (req, res) => {
    let { where_, func_id } = req.query;
    if (!where_) {
      where_ = `status = 1`
    } 

    if (!func_id) {
      return res.json();
    }

    let obj = {
      where_,
      func_id: parseInt(func_id),
    }

    getFuncByFuncId(obj, (err, results) => {
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

  updateFunc: (req, res) => {
    const { body } = req;
    const { func_id } = req.body;
    updateFunc(parseInt(func_id), body, (err, results) => {
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
        message: "Functionality updated successfully",
      });
    });
  },
  deleteFunc: (req, res) => {
    const { func_id } = req.body;
    deleteFunc(parseInt(func_id), (err, results) => {
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
        message: "Functionality deleted successfully",
      });
    });
  },

  reactivateFunc: (req, res) => {
    const { func_id } = req.body;
    reactivateFunc(parseInt(func_id), (err, results) => {
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
        message: "Functionality activated successfully",
      });
    });
  },
};
