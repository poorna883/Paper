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
var router = express.Router();
//get user info based on regNo 
router.get('/getUser', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var regNo, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regNo = request.query.regNo;
                if (!regNo) {
                    response.status(400).json({
                        success: false,
                        error: 'Bad Request',
                        message: 'invalid Parameters'
                    });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, handlers.getUser(regNo).then(function (data) {
                        response.json({
                            success: true,
                            user: data
                        });
                    })["catch"](function (error) {
                        response.json({
                            success: false,
                            error: error
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_1
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/addUser', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var regNo, name, password, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regNo = request.query.regNo;
                name = request.query.name;
                password = request.query.password;
                if (!regNo || !password || !name) {
                    response.status(400).json({
                        success: false,
                        error: 'Bad Request',
                        message: 'invalid Parameters'
                    });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, handlers.addUser(name, regNo, password).then(function (data) {
                        response.json({
                            success: true,
                            user: data
                        });
                    })["catch"](function (error) {
                        response.json({
                            success: false,
                            errorCode: error.code,
                            message: error.errmsg
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_2
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/addFavourities', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var regNo, favArray, i, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regNo = request.query.regNo;
                if (!request.query.fav || !regNo) {
                    response.status(400).json({
                        success: false,
                        error: 'Bad Request',
                        message: 'Wrong Parameters'
                    });
                    return [2 /*return*/];
                }
                favArray = request.query.fav.split(',');
                i = 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, handlers.addFavourities(regNo, favArray).then(function (data) {
                        response.json({
                            success: true,
                            result: data
                        });
                    })["catch"](function (error) {
                        response.status(500).json({
                            success: false,
                            error: error
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_3
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/removeFavourities', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var regNo, favArray, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regNo = request.query.regNo;
                if (!regNo || !request.query.fav) {
                    response.status(400).json({
                        success: false,
                        error: 'Bad Request',
                        message: 'Wrong Parameters'
                    });
                    return [2 /*return*/];
                }
                favArray = request.query.fav.split(',');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, handlers.removeFavourities(regNo, favArray).then(function (data) {
                        response.json({
                            success: true,
                            result: data
                        });
                    })["catch"](function (error) {
                        response.status(500).json({
                            success: false,
                            error: error
                        });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                response.status(500).json({
                    success: false,
                    error: error_4
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
