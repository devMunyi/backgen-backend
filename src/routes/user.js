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
  checkToken,
} = require("../../middlewares/user");
////---End import of custom middlewares

///----Routes defination
router.post("/add-user", userRegisterValidation, addUser); //register or add new user
router.get("/users", getUsers); //get all users
router.get("/user", getUserByUserId); //get a user by specified id param
router.put("/edit-user", checkToken, userEditValidation, updateUser); //edit existing user by specified id param
router.delete("/del-user", deleteUser); //delete a user by a specified id param
router.post("/user/login", loginUser); //login user either by email or username
router.get("/current-user", checkToken, currentUser); //to be used when navigating a user to protected site...
//pages or routes where uid, username, and email coming from the req (encoded on the jwt token) are...
//expected to match the ones stored in the db
router.get("/oauth/redirect", gitOauth); //login by git oauth
module.exports = router; //make the module available for imports
