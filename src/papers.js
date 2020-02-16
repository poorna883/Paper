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
var express = require("express");
var handlers = require("./database");
var mongoose = require("mongoose");
var base64 = require("base64topdf");
var model = require("./model");
var dest = "cat1";
var multer = require("multer");
var bodyParser = require("body-parser");
var Data = model.data;
var User = model.user;
var Paper = model.paper;
var Sub = model.subject;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "papers/" + dest + "/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "." + "pdf");
    }
});
var upload = multer({ storage: storage });
var router = express.Router();
router.get("/data", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idd, MongoClient, myurl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.query.id;
                idd = mongoose.mongo.ObjectId.createFromHexString(id);
                MongoClient = require("mongodb").MongoClient;
                myurl = "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority";
                return [4 /*yield*/, MongoClient.connect(myurl, { useNewUrlParser: true }, function (err, client) {
                        if (err)
                            return console.log(err);
                        var db = client.db("test");
                        db.collection("data").findOne({ _id: idd }, function (e, res) {
                            if (e) {
                                response.json({
                                    success: false,
                                    response: e
                                });
                            }
                            else {
                                try {
                                    // response.contentType("application/pdf");
                                    // const download = Buffer.from(res.data.toString("utf-8"), "base64");
                                    response.send(res.data);
                                }
                                catch (err) {
                                    response.json({
                                        success: false,
                                        response: err
                                    });
                                }
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/iosdata", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, idd, MongoClient, myurl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.query.id;
                idd = mongoose.mongo.ObjectId.createFromHexString(id);
                MongoClient = require("mongodb").MongoClient;
                myurl = "mongodb+srv://tushar1210:idbi1234@papervit-jcbvb.mongodb.net/test?retryWrites=true&w=majority";
                return [4 /*yield*/, MongoClient.connect(myurl, { useNewUrlParser: true }, function (err, client) {
                        if (err)
                            return console.log(err);
                        var db = client.db("test");
                        db.collection("data").findOne({ _id: idd }, function (e, res) {
                            if (e) {
                                response.json({
                                    success: false,
                                    response: e
                                });
                            }
                            else {
                                try {
                                    response.contentType("application/pdf");
                                    var download = Buffer.from(res.data.toString("utf-8"), "base64");
                                    response.send(download);
                                }
                                catch (err) {
                                    response.json({
                                        success: false,
                                        response: err
                                    });
                                }
                            }
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.get("/cat1/subjects", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, handlers.getCat1Subjects()];
            case 1:
                res = _a.sent();
                response.json({
                    success: true,
                    response: res
                });
                return [2 /*return*/];
        }
    });
}); });
router.get("/cat2/subjects", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handlers.getCat2Subjects()];
            case 1:
                result = _a.sent();
                response.json({
                    success: true,
                    response: result
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_1
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/fat/subjects", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handlers.getfatSubjects()];
            case 1:
                result = _a.sent();
                response.json({
                    success: true,
                    response: result
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_2
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/cat1/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        try {
            id = request.params.id;
            console.log(Sub.findById(id));
            Sub.findById(id)
                .populate("papers")
                .exec(function (err, sub) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(sub);
                    var arr = [];
                    sub.papers.forEach(function (paper) {
                        if (paper.exam === "cat1") {
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
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: error
            });
        }
        return [2 /*return*/];
    });
}); });
router.get("/cat2/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        try {
            id = request.params.id;
            console.log(Sub.findById(id));
            Sub.findById(id)
                .populate("papers")
                .exec(function (err, sub) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(sub);
                    var arr = [];
                    sub.papers.forEach(function (paper) {
                        if (paper.exam === "cat2") {
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
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: error
            });
        }
        return [2 /*return*/];
    });
}); });
router.get("/fat/:id", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        try {
            id = request.params.id;
            console.log(Sub.findById(id));
            Sub.findById(id)
                .populate("papers")
                .exec(function (err, sub) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(sub);
                    var arr = [];
                    sub.papers.forEach(function (paper) {
                        if (paper.exam === "fat") {
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
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: error
            });
        }
        return [2 /*return*/];
    });
}); });
router.get("/subjects/new", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("get  new subjects");
        try {
            response.render("index1");
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: error
            });
        }
        return [2 /*return*/];
    });
}); });
router.get("/new", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("get  new papers");
        try {
            response.render("index");
        }
        catch (error) {
            response.status(500).json({
                success: false,
                error: error
            });
        }
        return [2 /*return*/];
    });
}); });
router.post("/subjects", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handlers.uploadSubject(request.body).then(function (data) {
                        console.log("DOONE Subject");
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_3
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/upload", upload.single("paper"), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var file, error, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = req.file;
                    if (!file) {
                        error = {
                            message: "error",
                            code: 400
                        };
                        return [2 /*return*/, next(error)];
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, handlers.upload(file, req.body, dest).then(function (data) {
                            console.log("DOONE");
                            // res.redirect("/papers/index");
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.log("ERRROR");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
exports["default"] = router;
