// require subfunctionality models to avail its featured methods
const {
  addSubfunc,
  getSubfuncBySubfuncId,
  getSubfuncs,
  updateSubfunc,
  deleteSubfunc,
  reactivateSubfunc,
} = require('../models/subfunctionality');

const { inputAvailable, parseToInt } = require('../../helpers/common');

const { totalRecords } = require('../models/common');

module.exports = {
  addSubfunc: async (req, res) => {
    const { body } = req;

    try {
      await addSubfunc(body);

      return res.json({
        success: true,
        message: 'Sub-functionality added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Error occured in adding a new sub-functionality',
      });
    }
  },

  getSubfuncs: async (req, res) => {
    let queryObj = {};

    let { where_, search_, orderby, dir, offset, rpp } = req.query;

    if (!where_) {
      where_ = 'sf.status = 1';
    }

    search_ = inputAvailable(search_);
    if (search_ != undefined) {
      where_ += `AND sf.name LIKE '%${search_}%'`;
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

    // add data to queryObj object
    queryObj.where_ = where_;
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);

    try {
      const results = await getSubfuncs(queryObj);

      // get total subfunctionalities
      const { all_totals } = totalRecords({
        table: 'pr_subfunctions sf',
        field: 'sf.uid',
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

  getSubfuncBySubfuncId: async (req, res) => {
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
      subfun_id: parseToInt(subfun_id),
    };

    try {
      const result = await getSubfuncBySubfuncId(obj);

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

  updateSubfunc: async (req, res) => {
    const { body } = req;

    let { subfun_id } = req.body;

    subfun_id = parseToInt(subfun_id);

    try {
      const result = await updateSubfunc(subfun_id, body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality updated successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteSubfunc: async (req, res) => {
    const { subfun_id } = req.body;

    try {
      const result = await deleteSubfunc(parseInt(subfun_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality deleted successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivateSubfunc: async (req, res) => {
    const { subfun_id } = req.body;

    try {
      const result = await reactivateSubfunc(parseInt(subfun_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Sub-functionality activated successfully',
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
