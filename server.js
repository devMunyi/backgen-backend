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
//const compression = require("compression");

//const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const hostname = "localhost";

//configuring key middlewares
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors());
//app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
app.use("/back", express.static("public"));

//Autoload routes
readdirSync("./src/routes").map((r) =>
  app.use("/back", require(`./src/routes/${r}`))
);

//listen for incoming requests
app.listen(port, hostname, () => {
  console.log(`Server is up and running on port ${port}`);
});
