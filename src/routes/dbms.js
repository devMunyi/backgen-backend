const {
  addDbms,
  getDbmses,
  getDbmsByDbmsId,
  updateDbms,
  deleteDbms,
} = require("../controllers/dbms");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  dbmsIdValidation,
  dbmsAddValidation,
  dbmsEditValidation,
  validateImg,
} = require("../../middlewares/dbms");

//////-----End imported custom middlewares

////----Begin routes defination
router.post("/add-dbms", checkToken, validateImg, dbmsAddValidation, addDbms);
router.get("/dbmses", getDbmses);
router.get("/dbms", getDbmsByDbmsId);
router.put(
  "/edit-dbms",
  checkToken,
  dbmsIdValidation,
  validateImg,
  dbmsEditValidation,
  updateDbms
);
router.delete("/del-dbms", checkToken, dbmsIdValidation, deleteDbms);
////------End routes definations

module.exports = router; //make the module available for imports
