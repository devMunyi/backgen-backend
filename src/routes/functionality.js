const {
  addFunc,
  getFuncs,
  getFuncByFuncId,
  updateFunc,
  deleteFunc,
  reactivateFunc,
} = require("../controllers/functionality"); //require functionality controller to avail its featured methods
const router = require("express").Router(); //require router to define expected client request

//////------------------------------begin imported custom middlewares
const { checkToken } = require("../../middlewares/user"); //avail user checkToken middleware
const {
  funAddValidation,
  funEditValidation,
  validateImg,
} = require("../../middlewares/functionality"); //avail functionality add/edit validation middlewares
//////-------------------------------End imported custom middlewares

////-----------------Begin routes defination
router.post("/add-functionality", validateImg, funAddValidation, addFunc);
router.get("/functionalities", getFuncs);
router.get("/functionality", getFuncByFuncId);
router.put("/edit-functionality", validateImg, funEditValidation, updateFunc);
router.delete("/del-functionality", deleteFunc);
router.put("/reactivate-functionality", reactivateFunc);
////-------------------End routes definations

module.exports = router; ////make the module available for imports
