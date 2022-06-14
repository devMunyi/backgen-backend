const {
  addPlatform,
  getPlatforms,
  getPlatformByPlatformId,
  updatePlatform,
  deletePlatform,
  reactivatePlatform,
} = require("../controllers/platform"); //require platform controller to avail its featured methods
const router = require("express").Router(); //require router to define expected client request

/////---------------------------Begin of imported custom middlewares
const { checkToken } = require("../../middlewares/user"); //avail user checkToken middleware
const {
  platformAddValidation,
  platformEditValidation,
  validateImg,
} = require("../../middlewares/platform"); //avail platform add/edit validation middlewares
////----------------------------End of imported custom middlewares

//////---------------------------Begin Routes defination
router.post("/add-platform", validateImg, platformAddValidation, addPlatform);
router.get("/platforms", getPlatforms);
router.get("/platform", getPlatformByPlatformId);
router.put(
  "/edit-platform",
  validateImg,
  platformEditValidation,
  updatePlatform
);
router.delete("/del-platform", deletePlatform);
router.put("/reactivate-platform", reactivatePlatform);
//////---------------------------End Routes defination

module.exports = router; //make the module available for imports
