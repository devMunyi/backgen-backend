const {
  addFramework,
  getFrameworks,
  getFrameworkByFrameworkId,
  updateFramework,
  deleteFramework,
  reactivateFramework
} = require("../controllers/framework");
const router = require("express").Router();

/////-----Begin of imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  frameworkAddValidation,
  frameworkIdValidation,
  frameworkEditValidation,
  validateImg,
} = require("../../middlewares/framework");
/////-----End of imported custom middlewares

////Routes definations
router.post(
  "/add-framework",
  validateImg,
  frameworkAddValidation,
  addFramework
);
router.get("/frameworks", getFrameworks);
router.get("/framework", getFrameworkByFrameworkId);
router.put(
  "/edit-framework",
  validateImg,
  frameworkEditValidation,
  updateFramework
);
router.delete(
  "/del-framework",
  deleteFramework
);
router.put("/reactivate-framework", reactivateFramework);
module.exports = router; //make the module available for imports
