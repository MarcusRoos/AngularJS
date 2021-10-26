let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let mycourseSchema = new Schema({
    name: String,
    active: String,
    rank: String,
    TBC: String,
    value: Number,
    class: String,
    country: String
});

module.exports = mongoose.model("rosters", mycourseSchema);