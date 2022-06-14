const {
  addImplementation,
  getImplementations,
  getImplementationByImplementationId,
  updateImplementation,
  deleteImplementation,
  reactivateImplementation,
  getImplementationsByFunAndSubfun,
} = require("../controllers/implementation"); //require implementation controller to avail its featured methods
const router = require("express").Router(); //require router to define expected client request

//////------------------------------------begin custom imported middlewares
const { checkToken } = require("../../middlewares/user"); //avail user checkToken middleware
const {
  implementationAddValidation,
  implementationEditValidation,
} = require("../../middlewares/implementation"); //avail implementation add/edit validation middlewares
//////------------------------------------End imported custom middlewares

////---------------------------------------Begin routes defination
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
////-------------------------------------End routes definations

module.exports = router; ////make the module available for imports
