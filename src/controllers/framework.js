const {
  addFramework,
  getFrameworkByFrameworkId,
  getFrameworks,
  updateFramework,
  deleteFramework,
  getTotalRecords
} = require("../models/framework");
const {inputAvailable} = require("../../helpers/common");
const {fetchLanguageById} = require("../../helpers/language");

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
 
  getFrameworks: (req, res) => {

    let queryObj = {};

    let {language_id, where_, search_, orderby, dir, offset, rpp } = req.query;
    if (!where_) {
      where_ = "f.status = 1";
    }
    
    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND f.name LIKE '%${search_}%'`;
    } else {
      andsearch = "";
    }

    if (!orderby) {
      orderby = "f.name";
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
    queryObj.language_id = parseInt(language_id);
    queryObj.where_ = where_;
    queryObj.andsearch = andsearch;
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
          const icon = `/images/framework/${result.icon}`;
          result.icon = icon;

         /*  fetchLanguageById(result.language_id, (err1, result1) =>{
            if(err1){
              console.log(err1)
              return;
            }
  
            if (result1) {
              const language = result1;
              result.language_id = language;
              console.log("MANIPULATED RESULT => ", result);
            }
          }); */
          //console.log("LANGUAGE NAME =>", framework_language)
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

  getFrameworkByFrameworkId: (req, res) => {
    let { where_, framework_id } = req.query;
    if (!where_) {
      where_ = `f.status = 1`
    } 

    if (!framework_id) {
      return res.json();
    }

    let obj = {
      where_,
      framework_id: parseInt(framework_id),
    }
    getFrameworkByFrameworkId(obj, (err, results) => {
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
        results.icon = `/images/framework/${icon}`;
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  updateFramework: (req, res) => {
    const { body } = req;

    const { framework_id } = req.body;
    updateFramework(parseInt(framework_id), body, (err, results) => {
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
    const { framework_id } = req.body;
    deleteFramework(parseInt(framework_id), (err, results) => {
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

  reactivateFramework: (req, res) => {
    const { framework_id } = req.body;
    reactivateFramework(parseInt(framework_id), (err, results) => {
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
        message: "Framework activated successfully",
      });
    });
  },
};
