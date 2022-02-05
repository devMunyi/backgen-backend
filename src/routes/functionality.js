const {
  addFunc,
  getFuncs,
  getFuncByFuncId,
  updateFunc,
  deleteFunc,
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
router.post(
  "/add-functionality",
  checkToken,
  validateImg,
  funAddValidation,
  addFunc
);
router.get("/functionalities", getFuncs);
router.get("/functionality/:id", funIdValidation, getFuncByFuncId);
router.put(
  "/edit-functionality/:id",
  checkToken,
  funIdValidation,
  validateImg,
  funEditValidation,
  updateFunc
);
router.delete(
  "/del-functionality/:id",
  checkToken,
  funIdValidation,
  deleteFunc
);
////------End routes definations

module.exports = router; ////make the module available for imports
