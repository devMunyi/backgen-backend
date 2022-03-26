const {
  addCountry,
  getCountryByCountryId,
  getCountries,
  updateCountry,
  deleteCountry,
} = require("../models/country");

module.exports = {
  addCountry: (req, res) => {
    const { body } = req;
    //console.log(body);
    addCountry(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new country",
        });
      }
      return res.json({
        success: true,
        data: results,
        message: "Country added Successfully",
      });
    });
  },
  getCountryByCountryId: (req, res) => {
    const { country_id } = req.query;

    if(!country_id){
      return;
    }

    getCountryByCountryId(parseInt(country_id), (err, results) => {
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

      if (results) {
        const { flag } = results;
        results.flag = `images/country/${flag}`;

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  getCountries: (req, res) => {
    let queryObj = {};

    let { status, orderby, dir, offset, rpp } = req.query;

    if (!status) {
      status = 1;
    }
    if (!orderby) {
      orderby = "name";
    }
    if (!dir) {
      dir = "ASC";
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    //add data to queryObj object
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getCountries(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }

      if (results) {
        results.map((result) => {
          const flag = `images/country/${result.flag}`;
          result.flag = flag;
          //console.log(result);
        });

        return res.json({
          success: true,
          data: results,
        });
      }
    });
  },
  updateCountry: (req, res) => {
    const { body } = req;

    const { country_id } = req.body;
    updateCountry(parseInt(country_id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update country",
        });
      }

      return res.json({
        success: true,
        message: "Country updated successfully!",
      });
    });
  },
  deleteCountry: (req, res) => {
    const { country_id } = req.body;
    deleteCountry(parseInt(country_id), (err, results) => {
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
        message: "Country deleted successfully!",
      });
    });
  },
};
