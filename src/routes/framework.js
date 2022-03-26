const {
  addFramework,
  getFrameworks,
  getFrameworkByFrameworkId,
  updateFramework,
  deleteFramework,
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
  checkToken,
  validateImg,
  frameworkAddValidation,
  addFramework
);
router.get("/frameworks", getFrameworks);
router.get("/framework", getFrameworkByFrameworkId);
router.put(
  "/edit-framework",
  checkToken,
  frameworkIdValidation,
  validateImg,
  frameworkEditValidation,
  updateFramework
);
router.delete(
  "/del-framework",
  checkToken,
  frameworkIdValidation,
  deleteFramework
);

module.exports = router; //make the module available for imports
