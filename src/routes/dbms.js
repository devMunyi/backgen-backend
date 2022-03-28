const {
  addDbms,
  getDbmses,
  getDbmsByDbmsId,
  updateDbms,
  deleteDbms,
  reactivateDbms,
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
router.post("/add-dbms", validateImg, dbmsAddValidation, addDbms);
router.get("/dbmses", getDbmses);
router.get("/dbms", getDbmsByDbmsId);
router.put(
  "/edit-dbms",
  validateImg,
  dbmsEditValidation,
  updateDbms
);
router.delete("/del-dbms", deleteDbms);
router.put("/reactivate-dbms", reactivateDbms);
////------End routes definations

module.exports = router; //make the module available for imports
