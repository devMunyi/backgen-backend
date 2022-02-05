const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
} = require("../models/codesnippet");

module.exports = {
  addCodeSnippet: (req, res) => {
    const { body } = req;
    addCodeSnippet(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new code snippet",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
        message: "Code snippet added Successfully",
      });
    });
  },
  getCodeSnippetByCodeSnippetId: (req, res) => {
    const { id } = req.params;
    getCodeSnippetByCodeSnippetId(parseInt(id), (err, results) => {
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
  getCodeSnippets: (req, res) => {
    //initialize an empty object
    let queryObj = {};

    //destructuring req query for the variables
    let {
      platform_id,
      language_id,
      framework_id,
      implementation_id,
      dbms_id,
      status,
      orderby,
      dir,
    } = req.query;

    if (!platform_id) {
      platform_id = 0;
    }

    if (!language_id) {
      language_id = 0;
    }

    if (!framework_id) {
      framework_id = 0;
    }

    if (!implementation_id) {
      implementation_id = 0;
    }

    if (!dbms_id) {
      dbms_id = 0;
    }

    if (!status) {
      status = 1;
    }

    if (!orderby) {
      orderby = "uid";
    }

    if (!dir) {
      dir = "ASC";
    }

    //add data to queryObj object
    queryObj.platform_id = parseInt(platform_id);
    queryObj.language_id = parseInt(language_id);
    queryObj.framework_id = parseInt(framework_id);
    queryObj.implementation_id = parseInt(implementation_id);
    queryObj.dbms_id = parseInt(dbms_id);
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    getCodeSnippets(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        console.log(queryObj);
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
  updateCodeSnippet: (req, res) => {
    const { body } = req;
    const { id } = req.params;
    updateCodeSnippet(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update code snippet",
        });
      }

      return res.json({
        success: true,
        message: "Code snippet updated successfully!",
      });
    });
  },
  deleteCodeSnippet: (req, res) => {
    const { id } = req.params;
    deleteCodeSnippet(parseInt(parseInt(id)), (err, results) => {
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
        message: "Code snippet deleted successfully!",
      });
    });
  },
};
