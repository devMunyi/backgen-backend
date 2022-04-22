const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  getTotalRecords,
  searchCodesnippet,
  searchTotals,
} = require("../models/codesnippet");
const { inputAvailable } = require("../../helpers/common");

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
      return res.json({
        success: true,
        data: results,
        message: "Code snippet added Successfully",
      });
    });
  },

  updateCodeSnippet: (req, res) => {
    const { body } = req;
    const { codesnippet_id } = req.body;

    if (!codesnippet_id) {
      return res.json();
    }

    updateCodeSnippet(codesnippet_id, body, (err, results) => {
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

  searchCodesnippet: (req, res) => {
    //initialize an empty object
    let queryObj = {};

    //destructuring req query for the variables
    let { where_, search_, rpp, offset } = req.query;

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND c.title LIKE '%${search_}%'`;
    } else {
      andsearch = `AND c.title LIKE ''`;
    }

    if (!where_) {
      where_ = "c.status = 1";
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      //console.log("no rpp value");
      rpp = 7;
    }

    //add data to queryObj object
    queryObj.where_ = where_;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    queryObj.andsearch = andsearch;

    searchCodesnippet(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        //console.log(queryObj);
        return res.json({
          success: false,
          all_totals: 0,
          message: "No record(s) found",
        });
      } else {
        searchTotals(queryObj, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (!result) {
            return res.json({
              success: false,
              search_totals: 0,
              message: "No record(s) found",
            });
          } else {
            //get all total records
            return res.json({
              success: true,
              search_totals: result.search_totals,
              data: results,
            });
          }
        });
      }
    });
  },

  getCodeSnippets: (req, res) => {
    //initialize an empty object
    let queryObj = {};

    //destructuring req query for the variables
    let {
      where_,
      search_,
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      orderby,
      dir,
      rpp,
      offset,
    } = req.query;

    //console.log("QUERY =>", req.query);

    if (!where_) {
      where_ = "c.status = 1";
    }

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = ` AND c.title LIKE '%${search_}%'`;
      where_ += andsearch;
    }

    if (func_id) {
      func_id = parseInt(func_id);
      func_ = ` AND c.func_id = ${func_id}`;
      where_ += func_;
    }

    if (subfunc_id) {
      subfunc_id = parseInt(subfunc_id);
      subfunc_ = ` AND c.subfunc_id = ${subfunc_id}`;
      where_ += subfunc_;
    }
    if (language_id) {
      language_id = parseInt(language_id);
      language_ = ` AND c.language_id = ${language_id}`;
      where_ += language_;
    }
    if (framework_id) {
      framework_id = parseInt(framework_id);
      framework_ = ` AND c.framework_id = ${framework_id}`;
      where_ += framework_;
    }

    if (!orderby) {
      orderby = "c.title";
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

    queryObj.where_ = where_;
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    getCodeSnippets(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        //console.log(queryObj);
        return res.json({
          success: false,
          all_totals: 0,
          message: "No record(s) found",
        });
      } else {
        //get all total records
        getTotalRecords(queryObj, (err2, results2) => {
          //console.log("TOTAL RECORDS =>", results2);
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

  getCodeSnippetByCodeSnippetId: (req, res) => {
    const { codesnippet_id } = req.query;

    if (!codesnippet_id) {
      return;
    }

    getCodeSnippetByCodeSnippetId(parseInt(codesnippet_id), (err, results) => {
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
        all_totals: 1,
        data: results,
      });
    });
  },

  deleteCodeSnippet: (req, res) => {
    const { codesnippet_id } = req.body;

    if (!codesnippet_id) {
      return res.json();
    }

    deleteCodeSnippet(parseInt(parseInt(codesnippet_id)), (err, results) => {
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
