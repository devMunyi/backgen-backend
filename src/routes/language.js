const {
  addLanguage,
  getLanguages,
  getLanguageByLanguageId,
  updateLanguage,
  deleteLanguage,
  reactivateLanguage
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
  validateImg,
  languageAddValidation,
  addLanguage
);
router.get("/languages", getLanguages);
router.get("/language", getLanguageByLanguageId);
router.put(
  "/edit-language",
  validateImg,
  languageEditValidation,
  updateLanguage
);
router.delete(
  "/del-language",
  deleteLanguage
);
router.put("/reactivate-language", reactivateLanguage);
module.exports = router; ////make the module available for imports
