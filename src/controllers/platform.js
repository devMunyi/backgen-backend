require('../../config/db.config'); // require database configurations
const {
  addPlatform,
  getPlatformByPlatformId,
  getPlatforms,
  updatePlatform,
  deletePlatform,
  reactivatePlatform,
} = require('../models/platform'); // require platform models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); // require helper functions
const { totalRecords } = require('../models/common');

module.exports = {
  addPlatform: async (req, res) => {
    const { body } = req;

    try {
      const result = await addPlatform(body);

      return res.json({
        success: true,
        data: result,
        message: 'Platform added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new platform',
      });
    }
  },

  getPlatforms: async (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;
    if (!where_) {
      where_ = 'status = 1';
    }

    let andsearch;
    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      andsearch = `AND name LIKE '%${search_}%'`;
    } else {
      andsearch = '';
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
    queryObj.andsearch = andsearch;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    try {
      const results = await getPlatforms(queryObj);

      results.map((result) => {
        const icon = `/images/platform/${result.icon}`;
        result.icon = icon;
      });

      const { all_totals } = await totalRecords({
        table: 'pr_platforms',
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

  getPlatformByPlatformId: async (req, res) => {
    let { where_, platform_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!platform_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    let obj = {
      where_,
      platform_id: parseInt(platform_id),
    };

    try {
      const results = await getPlatformByPlatformId(obj);

      const { icon } = results;
      results.icon = `/images/platform/${icon}`;

      return res.json({
        success: true,
        data: results[0],
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  updatePlatform: async (req, res) => {
    const { body } = req;

    const { platform_id } = req.body;

    try {
      const result = await updatePlatform(parseInt(platform_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Platform updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deletePlatform: async (req, res) => {
    const { platform_id } = req.body;

    try {
      const results = await deletePlatform(parseInt(platform_id));

      if (results.affectedRows === 0 && results.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Platform deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivatePlatform: async (req, res) => {
    const { platform_id } = req.body;

    try {
      const results = await reactivatePlatform(parseInt(platform_id));

      if (results.affectedRows === 0 && results.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found',
        });
      }

      return res.json({
        success: true,
        message: 'Platform activated successfully',
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
