const {
  addLanguage,
  getLanguageByLanguageId,
  getLanguages,
  updateLanguage,
  deleteLanguage,
  reactivateLanguage,
} = require('../models/language'); //require language models to avail its featured methods
const { inputAvailable } = require('../../helpers/common'); //require common helper functions

const { totalRecords } = require('../models/common');

module.exports = {
  addLanguage: async (req, res) => {
    const { body } = req;

    try {
      await addLanguage(body);

      return res.json({
        success: true,
        message: 'Language added Successfully',
      });
    } catch (error) {
      console.log(error);

      return res.json({
        success: false,
        message: 'Error occured in adding a new language',
      });
    }
  },

  getLanguages: async (req, res) => {
    // initialize an empty object
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
      const results = await getLanguages(queryObj);

      results.map((result) => {
        const icon = `/images/language/${result.icon}`;
        result.icon = icon;
      });

      // languages count
      const { all_totals } = await totalRecords({
        table: 'pr_languages',
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

  getLanguageByLanguageId: async (req, res) => {
    let { where_, language_id } = req.query;
    if (!where_) {
      where_ = `status = 1`;
    }

    if (!language_id) {
      return res.json({
        success: false,
        message: 'Not found',
      });
    }

    let obj = {
      where_,
      language_id: parseInt(language_id),
    };

    try {
      const results = await getLanguageByLanguageId(obj);

      if (results.length) {
        const { icon } = results;
        results.icon = `/images/language/${icon}`;

        return res.json({
          success: true,
          data: results[0],
        });
      }
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  updateLanguage: (req, res) => {
    const { body } = req;

    const { language_id } = req.body;

    try {
      const result = updateLanguage(parseInt(language_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Language updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteLanguage: async (req, res) => {
    const { language_id } = req.body;

    try {
      const result = await deleteLanguage(parseInt(language_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Langauage deleted successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  reactivateLanguage: async (req, res) => {
    const { language_id } = req.body;

    try {
      const result = await reactivateLanguage(parseInt(language_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Language activated successfully',
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
