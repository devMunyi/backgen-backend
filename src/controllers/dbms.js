const {
  addDbms,
  getDbmsByDbmsId,
  getDbmses,
  updateDbms,
  deleteDbms,
  reactivateDbms,
  getTotalRecords
} = require("../models/dbms");
const { inputAvailable } = require("../../helpers/common");

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


  getDbmses: (req, res) => {
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
          const icon = `/images/dbms/${result.icon}`;
          result.icon = icon;
          console.log(result);
        });

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


  getDbmsByDbmsId: (req, res) => {
    let { where_, dbms_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!dbms_id) {
      return res.json();
    }

    let obj = {
      where_,
      dbms_id: parseInt(dbms_id),
    };

    getDbmsByDbmsId(obj, (err, results) => {
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
        results.icon = `/images/dbms/${icon}`;

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

  reactivateDbms: (req, res) => {
    const { dbms_id } = req.body;
    reactivateDbms(parseInt(dbms_id), (err, results) => {
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
        message: "Dbms activated successfully",
      });
    });
  },
};
