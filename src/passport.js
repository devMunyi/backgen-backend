require("dotenv").config();
const passport = require("passport");
const {
  getUserByUsernameOrByEmail,
  getUserByUsernameOrByEmail2,
  checkUserByEmail,
  addUserByGoogle,
  addUserByGthOrFbOrTwt,
} = require("./models/user");
//const { compareSync } = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const LocalStrategy = require("passport-local").Strategy;

//passport-local
passport.use(
  new LocalStrategy({ passReqToCallback: true }, function (
    req,
    username,
    password,
    done
  ) {
    if (!req.user) {
      return done(err); //when some errors occur
    } else {
      //all is fine
      //console.log("USER AT PASSPORT ZONE => ", req.user);
      return done(null, req.user, { success: true, message: "Login Success" });
    }
    // getUserByUsernameOrByEmail(username, (err, user) => {
    //   console.log("USER AT PASSPORT ZONE => ", req.user);
    //   if (err) {
    //     console.log("ERROR ZONE => ", err);
    //     return done(err); //when some errors occur
    //   }
    //   if (!user) {
    //     return done(null, false, {
    //       success: false,
    //       message: "Invalid username",
    //     });
    //   }

    //   //invalid password
    //   if (!compareSync(password, user.password)) {
    //     return done(null, false, {
    //       success: false,
    //       message: "Incorrect password",
    //     });
    //   } else {
    //     //all is fine
    //     user.password = undefined;
    //     return done(null, user, { success: true, message: "Login success" });
    //   }
    // });
  })
);

//passport-google-auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/back/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      let fullname = profile.displayName;
      let email = profile.emails[0].value;
      let username = "";
      let photo = profile.photos[0].value;
      let provider = "Google";

      user = {
        fullname,
        username,
        email,
        photo,
        provider,
      };

      checkUserByEmail(email, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          user.uid = result.uid;
          //console.log("AN EXISTING USER DETAILS => ", user);
          return cb(null, user);
        }

        if (!result) {
          //save user info to db
          addUserByGoogle(user, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              user.uid = results.insertId;
              //console.log("NEW USER DETAILS => ", user);
              return cb(null, user);
            }
          });
        }
      });
    }
  )
);

//passport-github-auth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/back/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      let fullname = profile.displayName;
      let email = profile._json.email;
      let username = profile.username;
      let photo = profile.photos[0].value;
      let provider = "Github";

      user = {
        username,
        email,
        fullname,
        photo,
        provider,
      };

      getUserByUsernameOrByEmail2({ email, username }, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          user.uid = result.uid;
          return cb(null, user);
        }

        if (!result) {
          //save user info to db
          addUserByGthOrFbOrTwt(user, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              user.uid = results.insertId;
              return cb(null, user);
            }
          });
        }
      });
    }
  )
);

//passport-facebook-auth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/back/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("FACEBOOK PROFILE => ", profile);
      let fullname = profile.displayName;
      let email = profile._json.email;
      console.log("EMAIL => ", email);
      let username = profile.username;
      let photo = profile.photos[0].value;
      let provider = "Facebook";

      user = {
        username,
        email,
        fullname,
        photo,
        provider,
      };

      getUserByUsernameOrByEmail2({ email, username }, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          user.uid = result.uid;
          console.log("AN EXISTING FACEBOOK USER DETAILS => ", user);
          return cb(null, user);
        }

        if (!result) {
          //save user info to db
          addUserByGthOrFbOrTwt(user, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              user.uid = results.insertId;
              console.log("NEW FACEBOOK USER DETAILS => ", user);
              return cb(null, user);
            }
          });
        }
      });
    }
  )
);

//passport-twitter auth
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: "/back/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      //console.log("TWITTER PROFILE => ", profile);
      let fullname = profile.displayName;
      let email = "";
      let username = profile.username;
      let photo = profile.photos[0].value;
      let provider = "Twitter";
      user = {
        fullname,
        username,
        email,
        photo,
        provider,
      };

      getUserByUsernameOrByEmail2({ email, username }, (err, result) => {
        if (err) {
          console.log(err);
        }

        if (result) {
          user.uid = result.uid;
          console.log("AN EXISTING TWITTER USER DETAILS => ", user);
          return cb(null, user);
        }

        if (!result) {
          //save user info to db
          addUserByGthOrFbOrTwt(user, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              user.uid = results.insertId;
              console.log("NEW TWITTER USER DETAILS => ", user);
              return cb(null, user);
            }
          });
        }
      });
    }
  )
);

// persists user iniside session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

//derializes user from session
passport.deserializeUser((user, cb) => {
  //console.log("DESERIALIZER ZONE => ", user);
  cb(null, user);
});

// //persists user data inside session
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// //Fetches session details using session id
// passport.deserializeUser(function (id, done) {
//   getUserByUserId(id, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     return done(null, user);
//   });
// });
