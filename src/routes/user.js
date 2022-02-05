const {
  addUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  loginUser,
  currentUser,
  gitOauth,
} = require("../controllers/user");
const router = require("express").Router();

////----Begin import of custom middlewares
const {
  userRegisterValidation,
  userEditValidation,
  userIdValidation,
  checkToken,
} = require("../../middlewares/user");
////---End import of custom middlewares

///----Routes defination
router.post("/add-user", checkToken, userRegisterValidation, addUser); //register or add new user
router.get("/users", checkToken, checkToken, getUsers); //get all users
router.get("/user/:id", checkToken, userIdValidation, getUserByUserId); //get a user by specified id param
router.put(
  "/edit-user/:id",
  checkToken,
  userIdValidation,
  userEditValidation,
  updateUser
); //edit existing user by specified id param
router.delete("/del-user/:id", checkToken, userIdValidation, deleteUser); //delete a user by a specified id param
router.post("/user/login", loginUser); //login user either by email or username
router.get("/current-user", checkToken, currentUser); //to be used when navigating a user to protected site...
//pages or routes where uid, username, and email coming from the req (encoded on the jwt token) are...
//expected to match the ones stored in the db
router.get("/oauth/redirect", gitOauth); //login by git oauth
module.exports = router; //make the module available for imports
