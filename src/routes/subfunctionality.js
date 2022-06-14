const {
  addSubfunc,
  getSubfuncs,
  getSubfuncBySubfuncId,
  updateSubfunc,
  deleteSubfunc,
  reactivateSubfunc,
} = require("../controllers/subfunctionality"); //require subfunctionality controller to avail its featured methods
const router = require("express").Router(); //require router to define expected client request

/////------------------------------begin imported custom middlewares
const { checkToken } = require("../../middlewares/user"); //avail user checkToken middleware
const {
  subfunAddValidation,
  subfunEditValidation,
  validateImg,
} = require("../../middlewares/subfunctionality"); //avail platform add/edit validation middlewares
/////-------------------------------End imported custom middlewares

////-------------------------------Begin routes defination
router.post("/add-subfunctionality", subfunAddValidation, addSubfunc);
router.get("/subfunctionalities", getSubfuncs);
router.get("/subfunctionality", getSubfuncBySubfuncId);
router.put("/edit-subfunctionality", subfunEditValidation, updateSubfunc);
router.delete("/del-subfunctionality", deleteSubfunc);
router.put("/reactivate-subfunctionality", reactivateSubfunc);
////----------------------------End routes defination

module.exports = router; ////make the module available for imports
