//const cookieSession = require("cookie-session");
const passport = require("passport");
require("dotenv").config();
require("./config/db.config");
require("./src/passport");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const compression = require("compression");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("express-flash");

const app = express();
const port = process.env.PORT || 5000;
const hostname = "localhost";

//configuring key middlewares
app.use(
  cors({
    origin: ["http://localhost", "https://backgen.net", "https://zidiapp.com"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
); //handles cross-domain requests

app.use(compression()); //compresses static files
app.use(morgan("dev")); //keep tracks of incoming requests
app.use(express.json()); //enable express to receive form data in json format
app.use(express.urlencoded({ extended: false })); //enable express to receive form data
app.use(fileUpload()); //handles file uploads
app.use("/back", express.static("public")); //defines where file requests should be retrieved

//Cookie session setup
// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [process.env.SESSION_SECRET],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

//express-session setup
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  clearExpired: true,
};

const sessionStore = new MySQLStore(options);

app.set("trust proxy", 1); // trust first proxy
app.use(flash()); //messages
app.use(
  session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, //12hours
    },
  })
);

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
