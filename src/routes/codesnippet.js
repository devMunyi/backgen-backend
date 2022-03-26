const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
} = require("../controllers/codesnippet");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  codesnippetIdValidation,
  codesnippetAddValidation,
  codesnippetEditValidation,
} = require("../../middlewares/codesnippet");
//////-----End imported custom middlewares

////----Begin routes defination
router.post(
  "/add-codesnippet",
  checkToken,
  codesnippetAddValidation,
  addCodeSnippet
);
router.get("/codesnippets", getCodeSnippets);
router.get(
  "/codesnippet",
  getCodeSnippetByCodeSnippetId
);
router.put(
  "/edit-codesnippet",
  checkToken,
  codesnippetIdValidation,
  codesnippetEditValidation,
  updateCodeSnippet
);
router.delete(
  "/del-codesnippet",
  checkToken,
  codesnippetIdValidation,
  deleteCodeSnippet
);
////------End routes definations

module.exports = router; //make the module available for imports
