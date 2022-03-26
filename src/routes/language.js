const {
  addLanguage,
  getLanguages,
  getLanguageByLanguageId,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/language");
const router = require("express").Router();

/////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  languageAddValidation,
  languageIdValidation,
  languageEditValidation,
  validateImg,
} = require("../../middlewares/language");
/////----End imported custom middlewares

///----Routes definations
router.post(
  "/add-language",
  checkToken,
  validateImg,
  languageAddValidation,
  addLanguage
);
router.get("/languages", getLanguages);
router.get("/language", getLanguageByLanguageId);
router.put(
  "/edit-language",
  checkToken,
  languageIdValidation,
  validateImg,
  languageEditValidation,
  updateLanguage
);
router.delete(
  "/del-language",
  checkToken,
  languageIdValidation,
  deleteLanguage
);

module.exports = router; ////make the module available for imports
