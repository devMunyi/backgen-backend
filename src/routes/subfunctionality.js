const {
  addSubfunc,
  getSubfuncs,
  getSubfuncBySubfuncId,
  updateSubfunc,
  deleteSubfunc,
  reactivateSubfunc,
} = require("../controllers/subfunctionality");
const router = require("express").Router();

/////----begin imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  subfunIdValidation,
  subfunAddValidation,
  subfunEditValidation,
  validateImg,
} = require("../../middlewares/subfunctionality");
/////----End imported custom middlewares

////----Begin routes defination
router.post("/add-subfunctionality", subfunAddValidation, addSubfunc);
router.get("/subfunctionalities", getSubfuncs);
router.get("/subfunctionality", getSubfuncBySubfuncId);
router.put("/edit-subfunctionality", subfunEditValidation, updateSubfunc);
router.delete("/del-subfunctionality", deleteSubfunc);
router.put("/reactivate-subfunctionality", reactivateSubfunc);
////----End routes defination

module.exports = router; ////make the module available for imports
