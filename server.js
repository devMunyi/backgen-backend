//const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
const pool = require("./config/db.config");
require("./src/passport");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const compression = require("compression");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();
const port = process.env.PORT || 5000;
const hostname = "localhost";

//configuring key middlewares

app.use(compression()); //compresses static files
app.use(morgan("dev")); //keep tracks of incoming requests
app.use(express.json()); //enable express to receive form data in json format
app.use(express.urlencoded({ extended: false })); //enable express to receive form data
app.use(fileUpload()); //handles file uploads
app.use("/back", express.static("public")); //defines where file requests should be retrieved
app.use(
  cors({
    origin: ["https://zidiapp.com", "https://backgen.net", "http://localhost"],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
  })
); //handles cross-domain requests

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   let allowedOrigins = [
//     "https://zidiapp.com",
//     "https://backgen.net",
//     "http://localhost",
//   ];
//   let origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// }); // --------------- SECOND CHANGE -------------------

//express-session configurations
const storeOptions = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  clearExpired: true,
}; //db store

if (process.env.NODE_ENV !== "Development") {
  storeOptions.host = process.env.HOST;
  storeOptions.user = process.env.USER;
  storeOptions.password = process.env.PASS;
  storeOptions.database = process.env.DATABASE;
}

const sessionStore = new MySQLStore(storeOptions);
const sessionOptions = {
  name: process.env.SESSION_KEY,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    sameSite: "lax", //"strict" or "none"
    secure: false,
    maxAge: 1000 * 60 * 60 * 12, //12hours
  },
};

if (process.env.NODE_ENV !== "Development") {
  sessionOptions.cookie.sameSite = "none";
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

app.use(passport.initialize()); //initialize passport
app.use(passport.session()); //initialize session with passport

//Autoload routes
readdirSync("./src/routes").map((r) =>
  app.use("/back", require(`./src/routes/${r}`))
);

//listen for incoming requests
app.listen(port, hostname, () => {
  console.log(`Server is up and running on port ${port}`);
});
