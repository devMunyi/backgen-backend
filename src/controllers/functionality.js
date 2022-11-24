// require functionality models to avail its featured methods
const {
  addFunc,
  getFuncByFuncId,
  getFuncs,
  updateFunc,
  deleteFunc,
  reactivateFunc,
} = require('../models/functionality');

// require common helper functions
const { inputAvailable, parseToInt } = require('../../helpers/common');

const { totalRecords } = require('../models/common');

module.exports = {
  addFunc: async (req, res) => {
    const { body } = req;

    try {
      await addFunc(body);

      return res.json({
        success: true,
        message: 'Functionality added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new functionality',
      });
    }
  },

  getFuncs: async (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;
    if (!where_) {
      where_ = 'status = 1';
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += `AND name LIKE '%${search_}%'`;
    }
    if (!orderby) {
      orderby = 'name';
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

    // add data to queryObj object
    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    try {
      const results = await getFuncs(queryObj);

      results.map((result) => {
        const icon = `/images/functionality/${result.icon}`;
        result.icon = icon;
      });

      // get total functionalities
      const { all_totals } = totalRecords({
        table: 'pr_functionalities',
        field: 'uid',
        where_,
      });

      return res.json({
        success: true,
        all_totals,
        data: results,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  getFuncByFuncId: async (req, res) => {
    let { where_, func_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!func_id) {
      return res.json({ success: false, message: 'Function Id is required' });
    }

    let obj = {
      where_,
      func_id: parseToInt(func_id),
    };

    try {
      const result = await getFuncByFuncId(obj);

      const { icon } = result;
      result.icon = `/images/functionality/${icon}`;

      return res.json({
        success: true,
        data: result[0],
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  updateFunc: async (req, res) => {
    const { body } = req;

    const { func_id } = req.body;

    try {
      const result = await updateFunc(parseToInt(func_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Functionality updated successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },
  deleteFunc: async (req, res) => {
    const { func_id } = req.body;

    try {
      const result = await deleteFunc(parseInt(func_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Functionality deleted successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivateFunc: async (req, res) => {
    const { func_id } = req.body;

    try {
      const result = await reactivateFunc(parseInt(func_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Functionality activated successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },
};
