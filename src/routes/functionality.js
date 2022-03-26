const {
  addFunc,
  getFuncs,
  getFuncByFuncId,
  updateFunc,
  deleteFunc,
  reactivateFunc,
} = require("../controllers/functionality");
const router = require("express").Router();

//////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  funIdValidation,
  funAddValidation,
  funEditValidation,
  validateImg,
} = require("../../middlewares/functionality");
//////-----End imported custom middlewares

////----Begin routes defination
router.post("/add-functionality", validateImg, funAddValidation, addFunc);
router.get("/functionalities", getFuncs);
router.get("/functionality", getFuncByFuncId);
router.put(
  "/edit-functionality",
  validateImg,
  funEditValidation,
  updateFunc
);
router.delete("/del-functionality", deleteFunc);
router.put("/reactivate-functionality", reactivateFunc);
////------End routes definations

module.exports = router; ////make the module available for imports
