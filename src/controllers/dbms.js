const {
  addDbms,
  getDbmsByDbmsId,
  getDbmses,
  updateDbms,
  deleteDbms,
  reactivateDbms,
} = require('../models/dbms'); // require dbms models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); // require common helper functions
const { totalRecords } = require('../models/common');

module.exports = {
  addDbms: async (req, res) => {
    const { body } = req;

    try {
      await addDbms(body);

      return res.json({
        success: true,
        message: 'Dbms added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new dbms',
      });
    }
  },

  getDbmses: async (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;

    if (!where_) {
      where_ = 'status = 1';
    }

    let andsearch;
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
      const results = await getDbmses(queryObj);

      results.map((result) => {
        const icon = `/images/dbms/${result.icon}`;
        result.icon = icon;
      });

      // dbmses count
      const { all_totals } = await totalRecords({
        table: 'pr_dbms',
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

  getDbmsByDbmsId: async (req, res) => {
    let { where_, dbms_id } = req.query;

    if (!where_) {
      where_ = `status = 1`;
    }

    if (!dbms_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    let obj = {
      where_,
      dbms_id: parseInt(dbms_id),
    };

    try {
      const result = await getDbmsByDbmsId(obj);

      const { icon } = result;
      result.icon = `/images/dbms/${icon}`;

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

  updateDbms: async (req, res) => {
    const { body } = req;

    const { dbms_id } = req.body;

    try {
      const result = await updateDbms(parseInt(dbms_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Dbms updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteDbms: async (req, res) => {
    const { dbms_id } = req.body;

    try {
      const result = await deleteDbms(parseInt(dbms_id, 10));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Dbms deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivateDbms: async (req, res) => {
    const { dbms_id } = req.body;

    try {
      const result = await reactivateDbms(parseInt(dbms_id, 10));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Dbms activated successfully',
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
