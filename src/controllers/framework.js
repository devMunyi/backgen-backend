const {
  addFramework,
  getFrameworkByFrameworkId,
  getFrameworks,
  updateFramework,
  deleteFramework,
} = require('../models/framework'); // require framework models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); // require common helper functions
const { totalRecords } = require('../models/common');

module.exports = {
  addFramework: async (req, res) => {
    const { body } = req;

    try {
      await addFramework(body);

      return res.json({
        success: true,
        message: 'Framework added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new framework',
      });
    }
  },

  getFrameworks: async (req, res) => {
    let queryObj = {};

    let { language_id, where_, search_, orderby, dir, offset, rpp } = req.query;
    if (!where_) {
      where_ = 'f.status = 1';
    }

    search_ = inputAvailable(search_);
    if (search_ !== undefined) {
      where_ += `AND f.name LIKE '%${search_}%'`;
    }

    if (!orderby) {
      orderby = 'f.name';
    }
    if (!dir) {
      dir = 'ASC';
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 30;
    }

    // add data to queryObj object
    queryObj.language_id = parseInt(language_id);
    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    try {
      const results = await getFrameworks(queryObj);

      results.map((result) => {
        const icon = `/images/framework/${result.icon}`;

        result.icon = icon;
      });

      // frameworks count
      const { all_totals } = await totalRecords({
        table: 'pr_frameworks f',
        field: 'f.uid',
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

  getFrameworkByFrameworkId: async (req, res) => {
    let { where_, framework_id } = req.query;
    if (!where_) {
      where_ = `f.status = 1`;
    }

    if (!framework_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    let obj = {
      where_,
      framework_id: parseInt(framework_id),
    };

    try {
      const results = await getFrameworkByFrameworkId(obj);

      const { icon } = results;

      results.icon = `/images/framework/${icon}`;

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

  updateFramework: async (req, res) => {
    const { body } = req;

    const { framework_id } = req.body;

    try {
      const result = await updateFramework(parseInt(framework_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Framework updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteFramework: async (req, res) => {
    const { framework_id } = req.body;

    try {
      const result = await deleteFramework(parseInt(framework_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Framework deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivateFramework: async (req, res) => {
    const { framework_id } = req.body;

    try {
      const result = await reactivateFramework(parseInt(framework_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Framework activated successfully',
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
