const {
  addSubfunc,
  getSubfuncBySubfuncId,
  getSubfuncs,
  updateSubfunc,
  deleteSubfunc,
  reactivateSubfunc,
  getTotalRecords,
} = require('../models/subfunctionality'); //require subfunctionality models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); //require helper functions

module.exports = {
  addSubfunc: (req, res) => {
    const { body } = req;

    addSubfunc(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Error occured in adding a new sub-functionality',
        });
      }
      return res.json({
        success: true,
        data: results,
        message: 'Sub-functionality added Successfully',
      });
    });
  },

  getSubfuncs: (req, res) => {
    let queryObj = {};
    let { where_, search_, orderby, dir, offset, rpp } = req.query;

    if (!where_) {
      where_ = 'sf.status = 1';
    }

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND sf.name LIKE '%${search_}%'`;
    } else {
      andsearch = '';
    }

    if (!orderby) {
      orderby = 'sf.name';
    }
    if (!dir) {
      dir = 'ASC';
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

    getSubfuncs(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
      if (!results) {
        console.log(queryObj);
        console.log(results);
        return res.json({
          success: false,
          message: 'No record(s) found',
        });
      }

      if (results) {
        getTotalRecords(queryObj, (err2, result2) => {
          if (err2) {
            console.log(err2);
            return res.json({
              success: false,
              message: 'Something went wrong. Try again later',
            });
          }
          if (result2) {
            return res.json({
              success: true,
              all_totals: result2.all_totals,
              data: results,
            });
          }
        });
      }
    });
  },

  getSubfuncBySubfuncId: (req, res) => {
    let { where_, subfun_id } = req.query;
    if (!where_) {
      where_ = `sf.status = 1`;
    }

    if (!subfun_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    let obj = {
      where_,
      subfun_id: parseInt(subfun_id),
    };

    getSubfuncBySubfuncId(obj, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'Record not found',
        });
      }

      if (results) {
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },

  updateSubfunc: (req, res) => {
    const { body } = req;

    const { subfun_id } = req.body;

    updateSubfunc(parseInt(subfun_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }

      if (!results) {
        return res.json({
          success: false,
          message: 'Failed to update sub-functionality',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality updated successfully',
      });
    });
  },

  deleteSubfunc: (req, res) => {
    const { subfun_id } = req.body;
    deleteSubfunc(parseInt(subfun_id), (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'Record Not Found',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality deleted successfully',
      });
    });
  },

  reactivateSubfunc: (req, res) => {
    const { subfun_id } = req.body;
    reactivateSubfunc(parseInt(subfun_id), (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Something went wrong. Try again later',
        });
      }
      if (!results) {
        return res.json({
          success: false,
          message: 'Record Not Found',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality activated successfully',
      });
    });
  },
};
