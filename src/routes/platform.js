const {
  addPlatform,
  getPlatforms,
  getPlatformByPlatformId,
  updatePlatform,
  deletePlatform,
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
  checkToken,
  validateImg,
  platformAddValidation,
  addPlatform
);
router.get("/platforms", getPlatforms);
router.get("/platform/:id", platformIdValidation, getPlatformByPlatformId);
router.put(
  "/edit-platform/:id",
  checkToken,
  platformIdValidation,
  validateImg,
  platformEditValidation,
  updatePlatform
);
router.delete(
  "/del-platform/:id",
  checkToken,
  platformIdValidation,
  deletePlatform
);

module.exports = router; //make the module available for imports
