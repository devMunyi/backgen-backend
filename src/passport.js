require("dotenv").config();
const passport = require("passport");
const async = require("async");
const { sign } = require("jsonwebtoken");
const {
  addUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsernameOrByEmail,
  getCurrentUser,
  checkUserByEmail,
  addUserByGoogle,
} = require("./models/user");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/back/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      let user;
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      //console.log("GOOGLE PROFILE", profile);
      let fullname = profile.displayName;
      let email = profile.emails[0].value;
      let photo = profile.photos[0].value;
      let provider = profile.provider;

      user = {
        fullname,
        email,
        photo,
        provider,
      };

      async.parallel(
        {
          task1: function (callback) {
            setTimeout(function () {
              checkUserByEmail(email, (err, result) => {
                if (err) {
                  console.log(err);
                }

                if (result) {
                  user.uid = result.uid;
                }

                if (!result) {
                  //save user info to db
                  addUserByGoogle(user, (err, results) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).json({
                        success: false,
                        message:
                          "Error occured during sign in. Please try again",
                      });
                    }
                    if (!results) {
                      return res.status(500).json({
                        success: false,
                        message:
                          "Error occured during sign in. Please try again",
                      });
                    } else {
                      user.uid = results.insertId;
                    }
                  });
                }
              });
              callback(null, user);
            }, 50);
          },
          task2: function (callback) {
            setTimeout(function () {
              console.log("Task Two");
              callback(null, 2);
            }, 100);
          },
        },
        function (err, results) {
          //console.log("FINAL USER DETAILS =>", results.task1);
          const jsontoken = sign(
            { result: results.task1 },
            process.env.JWT_SECRET,
            {
              expiresIn: "8h",
            }
          );

          user.token = jsontoken;

          return cb(err, user);

          // return res.json({
          //   success: true,
          //   message:
          //     "Logged in successfully. We are redirecting you back to home page",
          //   token: jsontoken,
          //   user,
          // });
        }
      );
    }
  )
);
