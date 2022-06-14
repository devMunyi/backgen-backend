const {
  addLanguage,
  getLanguageByLanguageId,
  getLanguages,
  updateLanguage,
  deleteLanguage,
  getTotalRecords,
  reactivateLanguage,
} = require("../models/language"); //require language models to avail its featured methods
const { inputAvailable } = require("../../helpers/common"); //require common helper functions

module.exports = {
  addLanguage: (req, res) => {
    const { body } = req;

    addLanguage(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new language",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Language added Successfully",
      });
    });
  },

  getLanguages: (req, res) => {
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
    getLanguages(queryObj, (err, results) => {
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
          const icon = `/images/language/${result.icon}`;
          result.icon = icon;
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

  getLanguageByLanguageId: (req, res) => {
    let { where_, language_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!language_id) {
      return res.json();
    }

    let obj = {
      where_,
      language_id: parseInt(language_id),
    };

    getLanguageByLanguageId(obj, (err, results) => {
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
        results.icon = `/images/language/${icon}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  updateLanguage: (req, res) => {
    const { body } = req;

    const { language_id } = req.body;
    updateLanguage(parseInt(language_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update language",
        });
      }

      return res.json({
        success: true,
        message: "Language updated successfully!",
      });
    });
  },

  deleteLanguage: (req, res) => {
    const { language_id } = req.body;
    deleteLanguage(parseInt(language_id), (err, results) => {
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
        message: "Langauage deleted successfully!",
      });
    });
  },

  reactivateLanguage: (req, res) => {
    const { language_id } = req.body;
    reactivateLanguage(parseInt(language_id), (err, results) => {
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
        message: "Language activated successfully",
      });
    });
  },
};
