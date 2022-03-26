const {
  addImplementation,
  getImplementations,
  getImplementationByImplementationId,
  updateImplementation,
  deleteImplementation,
} = require("../controllers/implementation");
const router = require("express").Router();

//////----begin custom imported middlewares
const { checkToken } = require("../../middlewares/user");
const {
  implementationAddValidation,
  implementationEditValidation,
  implementationIdValidation,
} = require("../../middlewares/implementation");
//////-----End imported custom middlewares

////----Begin routes defination
router.post(
  "/add-implementation",
  checkToken,
  implementationAddValidation,
  addImplementation
);
router.get("/implementations", getImplementations);
router.get(
  "/implementation",
  getImplementationByImplementationId
);
router.put(
  "/edit-implementation",
  checkToken,
  implementationIdValidation,
  implementationEditValidation,
  updateImplementation
);
router.delete(
  "/del-implementation",
  checkToken,
  implementationIdValidation,
  deleteImplementation
);
////------End routes definations

module.exports = router; ////make the module available for imports
