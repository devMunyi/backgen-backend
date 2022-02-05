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
router.get("/language/:id", languageIdValidation, getLanguageByLanguageId);
router.put(
  "/edit-language/:id",
  checkToken,
  languageIdValidation,
  validateImg,
  languageEditValidation,
  updateLanguage
);
router.delete(
  "/del-language/:id",
  checkToken,
  languageIdValidation,
  deleteLanguage
);

module.exports = router; ////make the module available for imports
