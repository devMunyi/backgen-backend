const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  getTotalRecords,
  searchCodesnippet,
  searchTotals,
  getRelatedSolns,
  reactivateCode,
} = require('../models/codesnippet'); //require codesnippet models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); //require common helper functions
const async = require('async');
const { decode } = require('html-entities');

module.exports = {
  addCodeSnippet: (req, res) => {
    const { body } = req;
    addCodeSnippet(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Error occured in adding a new code snippet',
        });
      }
      return res.json({
        success: true,
        data: results,
        message:
          'Added Successfully. It will be visible to the public once reviewed',
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
          message: 'Failed to update code snippet',
        });
      }

      return res.json({
        success: true,
        message: 'Update successful',
      });
    });
  },

  searchCodesnippet: (req, res) => {
    //initialize an empty object
    let queryObj = {};

    //destructuring req query for the variables
    let { status, search_, rpp, offset, orderby, dir } = req.query;
    status = parseInt(status);

    let where_ = Number.isFinite(status)
      ? `c.status = ${status}`
      : 'c.status >= 0';

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND c.title LIKE '%${search_}%'`;
    }
    console.log('where clause string => ', where_);

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      //console.log("no rpp value");
      rpp = 7;
    }

    if (!orderby) {
      orderby = 'c.uid';
    } else {
      orderby = `c.${orderby}`;
    }

    if (!dir) {
      dir = 'DESC';
    }

    orderby = `${orderby} ${dir}`;

    //add data to queryObj object
    queryObj.where_ = where_;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    queryObj.orderby = orderby;

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
          message: 'No record(s) found',
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
              message: 'No record(s) found',
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

  getCodeSnippets: async (req, res) => {
    //initialize an empty object
    let queryObj = {};

    //destructuring req query for the variables
    let {
      status,
      search_,
      func_id,
      subfunc_id,
      language_id,
      framework_id,
      user_impl_type_id,
      orderby,
      dir,
      rpp,
      offset,
    } = req.query;

    let where_ = '';
    status = parseInt(status);
    if (Number.isFinite(status)) {
      where_ = `c.status = ${status}`;
    } else {
      where_ = `c.status >= 0`;
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += ` AND c.title LIKE '%${search_}%'`;
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

    if (user_impl_type_id) {
      user_impl_type_id = parseInt(user_impl_type_id);
      implementation_ = ` AND c.user_impl_type_id = ${user_impl_type_id}`;
      where_ += implementation_;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    if (!orderby) {
      orderby = 'c.uid';
    } else {
      orderby = `c.${orderby}`;
    }

    if (!dir) {
      dir = 'DESC';
    }

    orderby = `${orderby} ${dir}`;

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
          message: 'No record(s) found',
        });
      } else {
        //get all total records
        getTotalRecords(queryObj, (err2, results2) => {
          if (err2) {
            console.log(err2);
            return;
          }

          if (results) {
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
    const { codesnippet_id, status } = req.query;

    if (!codesnippet_id) {
      return;
    }

    let where_ = `c.uid = ${codesnippet_id}`;
    if (status) {
      where_ += ` AND c.status = ${status}`;
    } else {
      where_ += ` AND c.status >= 0`;
    }

    getCodeSnippetByCodeSnippetId(where_, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          all_totals: 0,
          message: 'Record not found',
        });
      }

      results.row_code = decode(results.row_code);
      results.title = decode(results.title);
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
          message: 'Record Not Found',
        });
      }
      return res.json({
        success: true,
        message: 'Code snippet deleted successfully!',
      });
    });
  },

  getRelatedSolns: (req, res) => {
    let {
      func_id,
      language_id,
      subfunc_id,
      codesnippet_id,
      offset,
      rpp,
      status,
    } = req.query;

    let where_ = `c.func_id = ${func_id} AND c.subfunc_id = ${subfunc_id} AND c.language_id =${language_id} AND c.uid != ${codesnippet_id}`;
    if (status) {
      where_ += ` AND c.status = ${status}`;
    } else {
      where_ += ` AND c.status >= 0`;
    }

    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 25;
    }

    getRelatedSolns({ where_, offset, rpp }, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: err.message,
        });
      }

      if (results) {
        res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  reactivateCode: (req, res) => {
    const { codesnippet_id } = req.body;
    reactivateCode(parseInt(codesnippet_id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'Record Not Found',
        });
      }
      return res.json({
        success: true,
        message: 'Solution activated successfully',
      });
    });
  },
};
