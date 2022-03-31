const {
  addImplementation,
  getImplementations,
  getImplementationByImplementationId,
  updateImplementation,
  deleteImplementation,
  reactivateImplementation,
  getImplementationsByFunAndSubfun,
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
  implementationAddValidation,
  addImplementation
);
router.get("/implementations", getImplementations);
router.get("/implementation", getImplementationByImplementationId);
router.put(
  "/edit-implementation",
  implementationEditValidation,
  updateImplementation
);
router.delete("/del-implementation", deleteImplementation);
router.put("/reactivate-implementation", reactivateImplementation);
router.get("/fun-subfun-implementations", getImplementationsByFunAndSubfun);
////------End routes definations

module.exports = router; ////make the module available for imports
