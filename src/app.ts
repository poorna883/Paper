import express = require("express");
import user from "./user";
import mongoose = require("mongoose");
import papers from "./papers";
// import * as multer from multer;
const bodyParser = require("body-parser");
const multer = require("multer");
const PORT = 50;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to atlas");
  }
);

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;

app.use("/user", user);
app.use("/papers", papers);

app.listen(PORT, () => {});

export default mongoose;
