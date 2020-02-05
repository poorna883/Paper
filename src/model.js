"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dataSchema = new Schema({
    _id: String,
    data: String
});
var paperSchema = new Schema({
    _id: Schema.Types.ObjectId,
    subject: {
        type: Schema.Types.ObjectId
    },
    slot: String,
    exam: String,
    year: String,
    filename: String
});
exports.paper = mongoose.model("paper", paperSchema);
var subjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    subject: String,
    code: String,
    shortform: {
        required: false,
        type: String
    },
    cat1: String,
    cat2: String,
    fat: String,
    papers: [
        {
            type: Schema.Types.ObjectId,
            ref: "paper"
        }
    ]
});
exports.subject = mongoose.model("subjects", subjectSchema);
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    regNo: {
        type: String,
        required: true,
        minlength: 9,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    favourities: [
        {
            type: Schema.Types.ObjectId,
            ref: "subject"
        }
    ]
});
exports.data = mongoose.model("data", dataSchema);
exports.user = mongoose.model("user", userSchema);
exports["default"] = mongoose;
