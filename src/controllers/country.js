const {
  addCountry,
  getCountryByCountryId,
  getCountries,
  updateCountry,
  deleteCountry,
} = require('../models/country'); //require country models to avail its featured methods

module.exports = {
  addCountry: async (req, res) => {
    const { body } = req;

    try {
      await addCountry(body);

      return res.json({
        success: true,
        message: 'Country added Successfully',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  getCountryByCountryId: async (req, res) => {
    const { country_id } = req.query;

    if (!country_id) {
      return res.json({
        success: false,
        message: 'Country Id is required',
      });
    }

    try {
      const results = await getCountryByCountryId(parseInt(country_id));

      if (results.length === 0) {
        return res.json({
          success: false,
          message: 'Record not found',
        });
      }

      const { flag } = results;
      results.flag = `images/country/${flag}`;

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
  getCountries: async (req, res) => {
    let queryObj = {};

    let { status, orderby, dir, offset, rpp } = req.query;

    if (!status) {
      status = 1;
    }

    let where_ = `status = ${status}`;

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
    queryObj.orderby = `${orderby} ${dir}`;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    queryObj.where_ = where_;

    try {
      const results = await getCountries(queryObj);

      if (results.length === 0) {
        return res.json({
          success: false,
          message: 'No record(s) found',
        });
      }

      results.map((result) => {
        const flag = `images/country/${result.flag}`;
        result.flag = flag;
      });

      return res.json({
        success: true,
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

  updateCountry: async (req, res) => {
    const { body } = req;

    const { country_id } = req.body;

    try {
      const result = await updateCountry(parseInt(country_id), body);

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record to update not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Country updated successfully!',
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: 'Something went wrong. Try again later',
      });
    }
  },

  deleteCountry: async (req, res) => {
    const { country_id } = req.body;

    try {
      const result = await deleteCountry(parseInt(country_id));

      if (result.affectedRows === 0 && result.changedRows === 0) {
        return res.json({
          success: false,
          message: 'Record to delete not found!',
        });
      }

      return res.json({
        success: true,
        message: 'Country deleted successfully!',
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
