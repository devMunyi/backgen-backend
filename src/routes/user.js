require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");

const {
  addUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  loginUser,
  currentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");

////----Begin import of custom middlewares
const {
  userRegisterValidation,
  userEditValidation,
  checkToken,
  validateUserLogin,
} = require("../../middlewares/user");

// ////---End import of custom middlewares

// ///////---------------Passport js auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login/failed",
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get(
  "/twitter",
  passport.authenticate("twitter", { scope: ["profile", "email"] })
);
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "/login/failed",
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get("/logged-in", (req, res) => {
  console.log("SESSION =>", req.session);
  if (req.user) {
    console.log("LOGGED IN USER DATA => ", req.user);
    return res.json({
      success: true,
      message: "Found a logged in user",
      user: req.user,
      //cookies: req.cookies
      //jwt: req.jwt
    });
  } else {
    console.log("NO LOGGED IN USER DATA");
    return res.json({
      success: false,
      message: "No user found",
    });
  }
});

router.post(
  "/login",
  validateUserLogin,
  passport.authenticate("local", {
    failureRedirect: false,
    successRedirect: false,
    failureFlash: true,
  }),
  function (req, res) {
    console.log("FLASH INFO => ", req.flash);
    res.send({
      success: req.authInfo.success,
      message: req.authInfo.message,
      user: req.user,
    });
  }
);

router.get("/log-out", (req, res) => {
  req.logOut();
  res.status(200).send({
    success: true,
    message: "done",
  });
  //res.redirect(process.env.CLIENT_URL);
});

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

// router.get(
//   "/github",
//   passport.authenticate("github", { scope: ["profile", "email"] })
// );
// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: "/back/client/success/reponse",
//     failureRedirect: "/login/failed",
//   })
// );

// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: ["profile", "email"] })
// );
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/back/client/success/reponse",
//     failureRedirect: "/login/failed",
//   })
// );

// router.get(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/client/success/reponse",
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/login/failed", (req, res) => {
//   return res.json({
//     success: false,
//     message: "Login failed. Try Again",
//   });
// });

// router.get("/logout", (req, res) => {
//   req.logOut();
//   res.redirect(CLIENT_URL);
// });
//////-----------------End of Passport js auth

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
//router.post("/google/signin", googleAuth); //login by google oauth

module.exports = router; //make the module available for imports
