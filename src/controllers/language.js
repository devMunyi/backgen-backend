const {
  addLanguage,
  getLanguageByLanguageId,
  getLanguages,
  updateLanguage,
  deleteLanguage,
} = require("../models/language");

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

  getLanguageByLanguageId: (req, res) => {
    const { language_id } = req.query;

    if(!language_id){
      return;
    }
    
    getLanguageByLanguageId(parseInt(language_id), (err, results) => {
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
        results.icon = `images/language/${icon}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  getLanguages: async (req, res) => {
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
          const icon = `images/language/${result.icon}`;
          result.icon = icon;
        });
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
};
