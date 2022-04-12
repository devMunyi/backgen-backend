const {
  addCodeSnippet,
  getCodeSnippetByCodeSnippetId,
  getCodeSnippets,
  updateCodeSnippet,
  deleteCodeSnippet,
  searchCodesnippet,
} = require("../controllers/codesnippet");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  codesnippetAddValidation,
  codesnippetEditValidation,
} = require("../../middlewares/codesnippet");
//////-----End imported custom middlewares

////----Begin routes defination
router.post("/add-codesnippet", codesnippetAddValidation, addCodeSnippet);
router.get("/codesnippets", getCodeSnippets);
router.get("/codesnippet", getCodeSnippetByCodeSnippetId);
router.put("/edit-codesnippet", codesnippetEditValidation, updateCodeSnippet);
router.delete("/del-codesnippet", deleteCodeSnippet);
router.get("/search-codesnippet", searchCodesnippet);
////------End routes definations

module.exports = router; //make the module available for imports
