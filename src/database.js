"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var app_1 = require("./app");
var base64 = require("base64topdf");
var model = require("./model");
var multer = require("multer");
var fs = require("fs");
var Data = model.data;
var User = model.user;
var Paper = model.paper;
var Sub = model.subject;
function getUser(regNo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, User.findOne({ regNo: regNo })];
        });
    });
}
exports.getUser = getUser;
function addUser(name, regNo, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = new User({
                name: name,
                regNo: regNo,
                password: password
            });
            return [2 /*return*/, user.save()];
        });
    });
}
exports.addUser = addUser;
function addFavourities(regNo, favArr) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, User.findOneAndUpdate({ regNo: regNo }, { $push: { favourities: { $each: favArr } } })];
        });
    });
}
exports.addFavourities = addFavourities;
function removeFavourities(regNo, favArr) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, User.findOneAndUpdate({ regNo: regNo }, { $pullAll: { favourities: favArr } })];
        });
    });
}
exports.removeFavourities = removeFavourities;
function upload(file, body, type) {
    return __awaiter(this, void 0, void 0, function () {
        var encodedPdf, MongoClient, myurl;
        return __generator(this, function (_a) {
            encodedPdf = base64.base64Encode(file.path);
            MongoClient = require("mongodb").MongoClient;
            myurl = "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(myurl, { useNewUrlParser: true }, function (err, client) {
                if (err)
                    return console.log(err);
                var db = client.db("test");
                var id = new app_1["default"].Types.ObjectId();
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
                db.collection("paper").insertOne(finalImg, function (err, result) {
                    if (err)
                        return console.log(err);
                });
                db.collection("data").insertOne(blob, function (err, result) {
                    if (err)
                        return console.log(err);
                    console.log(id);
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.upload = upload;
function uploadSubject(body) {
    return __awaiter(this, void 0, void 0, function () {
        var MongoClient, myurl;
        return __generator(this, function (_a) {
            MongoClient = require("mongodb").MongoClient;
            myurl = "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(myurl, { useNewUrlParser: true }, function (err, client) {
                if (err)
                    return console.log(err);
                var db = client.db("test");
                var id = new app_1["default"].Types.ObjectId();
                var finalImg = {
                    _id: id,
                    subject: body.sub,
                    code: body.code,
                    cat1: body.cat1,
                    cat2: body.cat2,
                    fat: body.fat,
                    shortform: body.shortform
                };
                db.collection("subjects").insertOne(finalImg, function (err, result) {
                    if (err)
                        return console.log(err);
                    console.log(id);
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.uploadSubject = uploadSubject;
function getCat1Subjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Sub.find({ cat1: "true" })];
        });
    });
}
exports.getCat1Subjects = getCat1Subjects;
function getCat2Subjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Sub.find({ cat2: "true" })];
        });
    });
}
exports.getCat2Subjects = getCat2Subjects;
function getfatSubjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Sub.find({ fat: "true" })];
        });
    });
}
exports.getfatSubjects = getfatSubjects;
function getData(id) {
    return __awaiter(this, void 0, void 0, function () {
        var idd, MongoClient, myurl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idd = app_1["default"].mongo.ObjectId.createFromHexString(id);
                    MongoClient = require("mongodb").MongoClient;
                    myurl = "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority";
                    return [4 /*yield*/, MongoClient.connect(myurl, { useNewUrlParser: true }, function (err, client) {
                            if (err)
                                return console.log(err);
                            var db = client.db("test");
                            db.collection("data").findOne({ _id: idd }, function (e, res) {
                                console.log(res);
                                // resp = res
                                // return JSON.stringify(res)
                                return res;
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.getData = getData;
