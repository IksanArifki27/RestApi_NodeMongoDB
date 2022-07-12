require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");

// route
var indexRouter = require("./routes/index");

var mhsRouter = require("./routes/mahasiswa");
var userRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connection mongoDB
mongoose.connect(process.env.DB_CONNECTION);
let db = mongoose.connection;
db.once("open", () => {
  console.log("Database Connect");
});

app.use("/", indexRouter);
app.use("/mahasiswa", mhsRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on Port ");
});

module.exports = app;
