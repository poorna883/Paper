import express = require("express");
import handlers = require("./database");
import { GetFile } from "./interfaces";
var mongoose = require("mongoose");
const base64 = require("base64topdf");
var model = require("./model");
var dest = "cat1";
const multer = require("multer");
const bodyParser = require("body-parser");

var Data = model.data;
var User = model.user;
var Paper = model.paper;
var Sub = model.subject;

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "papers/" + dest + "/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "." + "pdf");
  }
});

var upload = multer({ storage: storage });

const router = express.Router();

router.get("/data", async (request, response) => {
  var id = request.query.id;
  var idd = mongoose.mongo.ObjectId.createFromHexString(id);

  const MongoClient = require("mongodb").MongoClient;
  const myurl =
    "mongodb+srv://vpc123:vpc123@cluster0-exwwr.mongodb.net/test?retryWrites=true&w=majority";
  await MongoClient.connect(myurl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    var db = client.db("test");
    db.collection("data").findOne({ _id: idd }, (e, res) => {
      if (e) {
        response.json({
          success: false,
          response: e
        });
      } else {
        try {
          response.contentType("application/pdf");
          const download = Buffer.from(res.data.toString("utf-8"), "base64");
          response.send(download);
        } catch (err) {
          response.json({
            success: false,
            response: err
          });
        }
      }
    });
  });
});

router.get("/cat1/subjects", async (request, response) => {
  var res = await handlers.getCat1Subjects();

  response.json({
    success: true,
    response: res
  });
});

router.get("/cat2/subjects", async (request, response) => {
  try {
    var result = await handlers.getCat2Subjects();
    response.json({
      success: true,
      response: result
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/fat/subjects", async (request, response) => {
  try {
    var result = await handlers.getfatSubjects();
    response.json({
      success: true,
      response: result
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/cat1/:id", async (request, response) => {
  try {
    const id = request.params.id;
    console.log(Sub.findById(id));
    Sub.findById(id)
      .populate("papers")
      .exec(function(err, sub) {
        if (err) {
          console.log(err);
        } else {
          console.log(sub);
          var arr = [];
          sub.papers.forEach(function(paper) {
            if ((paper.exam = "cat1")) {
              arr.push(paper);
            }
          });
          console.log(arr);
          response.json({
            success: true,
            response: arr
          });
        }
      });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/cat2/:id", async (request, response) => {
  try {
    const id = request.params.id;
    console.log(Sub.findById(id));
    Sub.findById(id)
      .populate("papers")
      .exec(function(err, sub) {
        if (err) {
          console.log(err);
        } else {
          console.log(sub);
          var arr = [];
          sub.papers.forEach(function(paper) {
            if ((paper.exam = "cat2")) {
              arr.push(paper);
            }
          });
          console.log(arr);
          response.json({
            success: true,
            response: arr
          });
        }
      });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/fat/:id", async (request, response) => {
  try {
    const id = request.params.id;
    console.log(Sub.findById(id));
    Sub.findById(id)
      .populate("papers")
      .exec(function(err, sub) {
        if (err) {
          console.log(err);
        } else {
          console.log(sub);
          var arr = [];
          sub.papers.forEach(function(paper) {
            if ((paper.exam = "fat")) {
              arr.push(paper);
            }
          });
          console.log(arr);
          response.json({
            success: true,
            response: arr
          });
        }
      });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/subjects/new", async (request, response) => {
  console.log("get  new subjects");
  try {
    response.render("index1");
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.get("/new", async (request, response) => {
  console.log("get  new papers");
  try {
    response.render("index");
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.post("/subjects", async (request, response) => {
  try {
    await handlers.uploadSubject(request.body).then(data => {
      console.log("DOONE Subject");
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error
    });
  }
});

router.post("/upload", upload.single("paper"), async function(
  req: GetFile,
  res,
  next
) {
  const file = req.file;

  if (!file) {
    const error = {
      message: "error",
      code: 400
    };
    return next(error);
  }
  switch (req.body.exam) {
    case "cat1" || "CAT1" || "Cat1":
      dest = "cat1";
      break;
    case "cat2" || "CAT2" || "Cat2":
      dest = "cat2";
      break;
    case "fat" || "FAT" || "Fat":
      dest = "fat";
      break;
    default:
      dest = "cat1";
      break;
  }
  try {
    await handlers.upload(file, req.body, dest).then(data => {
      console.log("DOONE");
      // res.redirect("/papers/index");
    });
  } catch (error) {
    console.log("ERRROR");
  }
});

export default router;
