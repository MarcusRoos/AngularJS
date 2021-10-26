let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let subjectSchema = new Schema({
    subjectCode: String,
    subject: String,
    preamble: String,
    bodyText: String,
    language: String
});

module.exports = mongoose.model("Subject", subjectSchema);