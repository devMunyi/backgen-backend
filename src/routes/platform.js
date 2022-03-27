const {
  addPlatform,
  getPlatforms,
  getPlatformByPlatformId,
  updatePlatform,
  deletePlatform,
  reactivatePlatform
} = require("../controllers/platform");
const router = require("express").Router();

/////-----Begin of imported custom middlewares
const { checkToken } = require("../../middlewares/user");
const {
  platformAddValidation,
  platformIdValidation,
  platformEditValidation,
  validateImg,
} = require("../../middlewares/platform");
////----End of imported custom middlewares

//Routes defination
router.post(
  "/add-platform",
  validateImg,
  platformAddValidation,
  addPlatform
);
router.get("/platforms", getPlatforms);
router.get("/platform", getPlatformByPlatformId);
router.put(
  "/edit-platform",
  validateImg,
  platformEditValidation,
  updatePlatform
);
router.delete(
  "/del-platform",
  deletePlatform
);
router.put("/reactivate-platform", reactivatePlatform);

module.exports = router; //make the module available for imports
