"use strict";
exports.__esModule = true;
var express = require("express");
var user_1 = require("./user");
var mongoose = require("mongoose");
var papers_1 = require("./papers");
// import * as multer from multer;
var bodyParser = require("body-parser");
var multer = require("multer");
var PORT = 50;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
mongoose.connect("mongodb+srv://vpc123:vpc123@cluster0-exwwr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log("connected to atlas");
});
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
app.use("/user", user_1["default"]);
app.use("/papers", papers_1["default"]);
app.listen(PORT, function () { });
exports["default"] = mongoose;