const { addListener } = require("../../config/db.config");
const {
  addPlatform,
  getPlatformByPlatformId,
  getPlatforms,
  updatePlatform,
  deletePlatform,
  getTotalRecords,
  reactivatePlatform
} = require("../models/platform");
const {inputAvailable} = require("../../helpers/common");

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
      return res.json({
        success: true,
        data: results,
        message: "Platform added Successfully",
      });
    });
  },

  getPlatforms: (req, res) => {
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
          const icon = `/images/platform/${result.icon}`;
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

  getPlatformByPlatformId: (req, res) => {
    const { platform_id } = req.query;

    if(!platform_id){
      return
    }
    
    getPlatformByPlatformId(parseInt(platform_id), (err, results) => {
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

  updatePlatform: (req, res) => {
    const { body } = req;

    const { platform_id } = req.body;
    updatePlatform(parseInt(platform_id), body, (err, results) => {
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
    console.log("Platform id to delete =>",req.body.platform_id)
    const { platform_id } = req.body;
    deletePlatform(parseInt(platform_id), (err, results) => {
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

  reactivatePlatform: (req, res) => {
    const { platform_id } = req.body;
    reactivatePlatform(parseInt(platform_id), (err, results) => {
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
        message: "Platform activated successfully",
      });
    });
  },
};
