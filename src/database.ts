import mongoose from "./app";
import express = require("express");
import { subject } from "./model";
const base64 = require("base64topdf");

var model = require("./model");
const multer = require("multer");
var fs = require("fs");

var Data = model.data;
var User = model.user;
var Paper = model.paper;
var Sub = model.subject;

export async function getUser(regNo: string) {
  return User.findOne({ regNo: regNo });
}

export async function addUser(name: string, regNo: string, password: string) {
  var user = new User({
    name: name,
    regNo: regNo,
    password: password
  });
  return user.save();
}

export async function addFavourities(regNo: string, favArr: string[]) {
  return User.findOneAndUpdate(
    { regNo: regNo },
    { $push: { favourities: { $each: favArr } } }
  );
}

export async function removeFavourities(regNo: string, favArr: string[]) {
  return User.findOneAndUpdate(
    { regNo: regNo },
    { $pullAll: { favourities: favArr } }
  );
}

export async function upload(file, body, type) {
  let encodedPdf = base64.base64Encode(file.path);
  const MongoClient = require("mongodb").MongoClient;
  const myurl =
    "mongodb+srv://vpc123:vpc123@cluster0-exwwr.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(myurl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    var db = client.db("test");
    var id = new mongoose.Types.ObjectId();
    var finalImg = {
      _id: id,
      slot: body.slot,
      exam: type,
      year: body.year,
      filename: body.filename
    };
    var blob = {
      _id: id,
      data: encodedPdf
    };
    db.collection("paper").insertOne(finalImg, (err, result) => {
      if (err) return console.log(err);
    });
    db.collection("data").insertOne(blob, (err, result) => {
      if (err) return console.log(err);
      console.log(id);
    });
  });
}

export async function uploadSubject(body) {
  const MongoClient = require("mongodb").MongoClient;
  const myurl =
    "mongodb+srv://vpc123:vpc123@cluster0-exwwr.mongodb.net/test?retryWrites=true&w=majority";

  MongoClient.connect(myurl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    var db = client.db("test");
    var id = new mongoose.Types.ObjectId();
    var finalImg = {
      _id: id,
      subject: body.sub,
      code: body.code,
      cat1: body.cat1,
      cat2: body.cat2,
      fat: body.fat,
      shortform: body.shortform
    };
    db.collection("subjects").insertOne(finalImg, (err, result) => {
      if (err) return console.log(err);
      console.log(id);
    });
  });
}

export async function getCat1Subjects() {
  return Sub.find({ cat1: "true" });
}
export async function getCat2Subjects() {
  return Sub.find({ cat2: "true" });
}
export async function getfatSubjects() {
  return Sub.find({ fat: "true" });
}

export async function getData(id: string) {
  var idd = mongoose.mongo.ObjectId.createFromHexString(id);
  const MongoClient = require("mongodb").MongoClient;
  const myurl =
    "mongodb+srv://vpc123:vpc123@cluster0-exwwr.mongodb.net/test?retryWrites=true&w=majority";
  await MongoClient.connect(myurl, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    var db = client.db("test");
    db.collection("data").findOne({ _id: idd }, (e, res) => {
      console.log(res);
      // resp = res
      // return JSON.stringify(res)
      return res;
    });
  });

  // return Data.findOne({_id:id})
}
