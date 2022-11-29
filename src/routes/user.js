require('dotenv').config(); //require environment variables
const router = require('express').Router(); //require router to define expected client request

// require user controller to avail its featured methods
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
} = require('../controllers/user');

////----------------------------------Begin import of custom middlewares
const {
  userRegisterValidation,
  userEditValidation,
  checkToken,
} = require('../../middlewares/user'); //avail user add/edit validation middlewares
const { google } = require('googleapis'); //avail googleapis to allow google OAUTH

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
router.get('/google/signin', (req, res) => {
  //generate url for google oauth
  function getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2ClientSignin.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }

  let gOuthUrl = getGoogleAuthURL();
  res.redirect(gOuthUrl);
});

router.get('/google/signin/callback', googleOAuthSignin);

///--End sign in with google route, without passport

///--Begin sign up with google route, without passport
router.get('/google/signup', (req, res) => {
  //generate url for google oauth
  function getGoogleAuthURL() {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2ClientSignup.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes, // If you only need one scope you can pass it as string
    });
  }

  let gOuthUrl = getGoogleAuthURL();
  res.redirect(gOuthUrl);
});

router.get('/google/signup/callback', googleOAuthSignup);

///--End sign up with google route, without using passport

///--Begin sign in with github oauth without passport js
router.get('/github/signin', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.SIGNIN_GITHUB_CLIENT_ID}`
  );
});

router.get('/github/signin/callback', githubOAuthSignin);
///--End sign in with github oauth without passport js

///--Begin sign up with github oauth without passport js
router.get('/github/signup', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.SIGNUP_GITHUB_CLIENT_ID}`
  );
});

router.get('/github/signup/callback', githubOAuthSignup);
///-- End sign up with github oauth without passport js

router.post('/forgot-password', forgotPassword); // forgot password route

router.post('/reset-password', resetPassword); //reset password route

router.post('/add-user', userRegisterValidation, addUser); //register or add new user
router.get('/users', getUsers); //get all users
router.get('/user', getUserByUserId); //get a user by specified id param
router.put('/edit-user', checkToken, userEditValidation, updateUser); //edit existing user by specified id param
router.delete('/del-user', deleteUser); //delete a user by a specified id param
router.post('/user/login', loginUser); //login user either by email or username
router.get('/current-user', checkToken, currentUser); //to be used when navigating a user to protected site...

module.exports = router; // make the module available for imports
