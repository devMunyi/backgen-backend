const {
  addSubfunc,
  getSubfuncs,
  getSubfuncBySubfuncId,
  updateSubfunc,
  deleteSubfunc,
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
router.get("/subfunctionality/:id", subfunIdValidation, getSubfuncBySubfuncId);
router.put(
  "/edit-subfunctionality/:id",
  subfunIdValidation,
  subfunEditValidation,
  updateSubfunc
);
router.delete("/del-subfunctionality/:id", subfunIdValidation, deleteSubfunc);
////----End routes defination

module.exports = router; ////make the module available for imports
