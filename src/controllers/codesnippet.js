const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  getTotalRecords,
  getImplNames,
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

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND c.title LIKE '%${search_}%'`;
    } else {
      andsearch = "";
    }

    if (!func_id) {
      func_id = 0;
    }

    if (!subfunc_id) {
      subfunc_id = 0;
    }

    if (!language_id) {
      language_id = 0;
    }

    if (!framework_id) {
      framework_id = 0;
    }

    if (!where_) {
      where_ = "c.status = 1";
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
      console.log("NO RPP SPECIFIED");
      rpp = 1;
    }
    //add data to queryObj object

    queryObj.func_id = parseInt(func_id);
    queryObj.subfunc_id = parseInt(subfunc_id);
    queryObj.language_id = parseInt(language_id);
    queryObj.framework_id = parseInt(framework_id);
    queryObj.where_ = where_;
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    queryObj.andsearch = andsearch;

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
            //onsole.log(err2);
            return;
          }

          if (results2) {
            getImplNames(queryObj, (err3, results3) => {
              //console.log("FUNCTION 3 call result =>", results3);
              if (err3) {
                console.log(err3);
              }

              if (!results3) {
                return res.json({
                  success: false,
                  message: "No record found",
                  all_totals: 0,
                });
              }

              if (results3) {
                return res.json({
                  success: true,
                  all_totals: results2.all_totals,
                  impl_names: results3,
                  data: results,
                });
              }
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
          message: "Record not found",
        });
      }
      return res.json({
        success: true,
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
