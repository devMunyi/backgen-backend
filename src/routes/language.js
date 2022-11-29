const apicache = require('apicache');
// let cache = apicache.middleware;
const {
  addLanguage,
  getLanguages,
  getLanguageByLanguageId,
  updateLanguage,
  deleteLanguage,
  reactivateLanguage,
} = require('../controllers/language'); //require language controller to avail its featured methods
const router = require('express').Router(); //require router to define expected client request

/////-------------------------begin imported custom middlewares
const {
  languageAddValidation,
  languageEditValidation,
  validateImg,
} = require('../../middlewares/language'); //avail langauage add/edit validation middlewares
/////--------------------------End imported custom middlewares

///---------------------------Routes definition
router.post('/add-language', validateImg, languageAddValidation, addLanguage);
router.get('/languages', getLanguages);
router.get('/language', getLanguageByLanguageId);
router.put(
  '/edit-language',
  validateImg,
  languageEditValidation,
  updateLanguage
);
router.delete('/del-language', deleteLanguage);
router.put('/reactivate-language', reactivateLanguage);
/////--------------------------End Routes defination

module.exports = router; ////make the module available for imports
