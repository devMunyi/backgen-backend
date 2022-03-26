const {
  addCountry,
  getCountries,
  getCountryByCountryId,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  countryIdValidation,
  countryAddValidation,
  countryEditValidation,
  validateImg,
} = require("../../middlewares/country");
//////-----End imported custom middlewares

////----Begin routes defination
router.post(
  "/add-country",
  checkToken,
  validateImg,
  countryAddValidation,
  addCountry
);
router.get("/countries", getCountries);
router.get("/country", getCountryByCountryId);
router.put(
  "/edit-country",
  checkToken,
  countryIdValidation,
  validateImg,
  countryEditValidation,
  updateCountry
);
router.delete(
  "/del-country",
  checkToken,
  countryIdValidation,
  deleteCountry
);
////------End routes definations

module.exports = router; ////make the module available for imports
