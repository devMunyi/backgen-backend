require("dotenv").config(); //require environment variables
const router = require("express").Router(); //require router to define expected client request
const passport = require("passport"); //require passport
const queryString = require("query-string");

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
  googleOAuthSignin,
  googleOAuthSignup,
  githubOAuthSignup,
  githubOAuthSignin,
  facebookOAuthSignup,
  facebookOAuthSignin,
} = require("../controllers/user"); //require user controller to avail its featured methods

////----------------------------------Begin import of custom middlewares
const {
  userRegisterValidation,
  userEditValidation,
  checkToken,
} = require("../../middlewares/user"); //avail user add/edit validation middlewares
const { google } = require("googleapis"); //avail googleapis to allow google OAUTH

////-----------------------------------End import of custom middlewares

const oauth2ClientSignin = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SIGNIN_GOOGLE_CALLBACK_URL
); ///--Initializing Google oauth signin client parameters

const oauth2ClientSignup = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.SIGNUP_GOOGLE_CALLBACK_URL
); ///--Initializing Google oauth signup client parameters

//---------------------------------Routes defination
//--Begin sign in with google route, without passport
router.get("/google/signin", (req, res) => {
  //generate url for google oauth
  function getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    return oauth2ClientSignin.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }

  let gOuthUrl = getGoogleAuthURL();
  res.redirect(gOuthUrl);
});

router.get("/google/signin/callback", googleOAuthSignin);

///--End sign in with google route, without passport

///--Begin sign up with google route, without passport
router.get("/google/signup", (req, res) => {
  //generate url for google oauth
  function getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    return oauth2ClientSignup.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }

  let gOuthUrl = getGoogleAuthURL();
  res.redirect(gOuthUrl);
});

router.get("/google/signup/callback", googleOAuthSignup);

///--End sign up with google route, without using passport

///--Begin sign in with github oauth without passport js
router.get("/github/signin", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.SIGNIN_GITHUB_CLIENT_ID}`
  );
});

router.get("/github/signin/callback", githubOAuthSignin);
///--End sign in with github oauth without passport js

///--Begin sign up with github oauth without passport js
router.get("/github/signup", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.SIGNUP_GITHUB_CLIENT_ID}`
  );
});

router.get("/github/signup/callback", githubOAuthSignup);
///--End sign up with github oauth without passport js

///--Begin sign up with facebook route, without passport
router.get("/facebook/signup", (req, res) => {
  //generate url for facebook oauth
  function getFacebookAuthURL() {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.FACEBOOK_APP_ID,
      redirect_uri: process.env.SIGNUP_FACEBOOK_CALLBACK_URL,
      scope: ["email", "user_friends"].join(","), // comma seperated string
      response_type: "code",
      auth_type: "rerequest",
      display: "popup",
    });
    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  }

  let fbOuthUrl = getFacebookAuthURL();
  res.redirect(fbOuthUrl);
});

router.get("/facebook/signup/callback", facebookOAuthSignup);
///--End sign up with facebook route, without using passport

///--Begin sign up with facebook route, without passport
router.get("/facebook/signin", (req, res) => {
  //generate url for facebook oauth
  function getFacebookAuthURL() {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.FACEBOOK_APP_ID,
      redirect_uri: process.env.SIGNIN_FACEBOOK_CALLBACK_URL,
      scope: ["email", "user_friends"].join(","), // comma seperated string
      response_type: "code",
      auth_type: "rerequest",
      display: "popup",
    });
    return `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
  }

  let fbOuthUrl = getFacebookAuthURL();
  //console.log("fb url => ", fbOuthUrl);
  res.redirect(fbOuthUrl);
});

router.get("/facebook/signin/callback", facebookOAuthSignin);
///--End sign up with facebook route, without using passport

router.post("/forgot-password", forgotPassword); // forgot password route

router.post("/reset-password", resetPassword); //reset password route

router.post("/add-user", userRegisterValidation, addUser); //register or add new user
router.get("/users", getUsers); //get all users
router.get("/user", getUserByUserId); //get a user by specified id param
router.put("/edit-user", checkToken, userEditValidation, updateUser); //edit existing user by specified id param
router.delete("/del-user", deleteUser); //delete a user by a specified id param
router.post("/user/login", loginUser); //login user either by email or username
router.get("/current-user", checkToken, currentUser); //to be used when navigating a user to protected site...

/////-----------End of github oauth route without passport js

////---------Google oauth with passport js
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: process.env.CLIENT_URL + "?success=" + false,
//     successRedirect: process.env.CLIENT_URL + "?success=" + true,
//   })
// );

/////----------End route for google oauth with passport js

//----------------passport github oauth
// router.get(
//   "/github",
//   passport.authenticate("github", { scope: ["profile", "email"] })
// );
// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     failureRedirect: "/login/failed",
//     successRedirect: process.env.CLIENT_URL,
//   })
// );

////--------------End route for github oauth with passport js

/////-------------Begin route for facebook Oauth with passport js
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: ["profile", "email"] })
// );
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: "/login/failed",
//     successRedirect: process.env.CLIENT_URL,
//   })
// );

/////-------------End route for facebook Oauth with passport js

/////-------------Begin route for twitter Oauth with passport js
// router.get(
//   "/twitter",
//   passport.authenticate("twitter", { scope: ["profile", "email"] })
// );
// router.get(
//   "/twitter/callback",
//   passport.authenticate("twitter", {
//     failureRedirect: "/login/failed",
//     successRedirect: process.env.CLIENT_URL,
//   })
// );

/////-------------End route for twitter Oauth with passport js

////-------Begin route for checking if user is authorized with passport and cookie-session
// router.get("/logged-in", (req, res) => {
//   //console.log("SESSION =>", req.session);
//   if (req.user) {
//     //console.log("LOGGED IN USER DATA => ", req.user);
//     return res.json({
//       success: true,
//       message: "Found a logged in user",
//       user: req.user,
//       //cookies: req.cookies
//       //jwt: req.jwt
//     });
//   } else {
//     console.log("NO LOGGED IN USER DATA");
//     return res.json({
//       success: false,
//       message: "No user found",
//     });
//   }
// });

////-------End route for checking if user is authorized with passport and cookie-session

/////----Begin route for passport local login
// router.post(
//   "/login",
//   validateUserLogin,
//   passport.authenticate("local", {
//     failureRedirect: false,
//     successRedirect: false,
//     failureFlash: true,
//   }),
//   function (req, res) {
//     //console.log("FLASH INFO => ", req.flash);
//     res.send({
//       success: req.authInfo.success,
//       message: req.authInfo.message,
//       user: req.user,
//     });
//   }
// );

////-------End route for passport local login

////----Begin route for logging out user session persisted using cookie session with passport js
// router.get("/log-out", (req, res) => {
//   req.logOut();
//   res.status(200).send({
//     success: true,
//     message: "done",
//   });
// });

////----End route for logging out user session persisted using cookie session with passport js

module.exports = router; //make the module available for imports
