let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    name: String,
    currentGuild: String,
    reliable: String
});

module.exports = mongoose.model("guilds", courseSchema);