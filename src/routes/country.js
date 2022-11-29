const apicache = require('apicache');
// let cache = apicache.middleware;
const {
  addCountry,
  getCountries,
  getCountryByCountryId,
  updateCountry,
  deleteCountry,
} = require('../controllers/country'); //require country controller to avail its featured methods
const router = require('express').Router(); //require router to define expected client request

//////-------------------------begin imported custom middlewares
const { checkToken } = require('../../middlewares/user'); //avail user checkToken middleware
const {
  countryAddValidation,
  countryEditValidation,
  validateImg,
} = require('../../middlewares/country'); //avail country add/edit validation middlewares
//////--------------------------End imported custom middlewares

////-------------------------------Begin routes defination
router.post(
  '/add-country',
  checkToken,
  validateImg,
  countryAddValidation,
  addCountry
);
router.get('/countries', getCountries);
router.get('/country', getCountryByCountryId);
router.put(
  '/edit-country',
  checkToken,
  validateImg,
  countryEditValidation,
  updateCountry
);
router.delete('/del-country', checkToken, deleteCountry);
////---------------------------End routes definations

module.exports = router; ////make the module available for imports
