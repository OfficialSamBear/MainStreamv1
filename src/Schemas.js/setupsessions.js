const { Schema, model } = require('mongoose');

let SessionSchema = new Schema({
    Guild: String,
    GuildId: String,
    Channel: String,
    Name: String,
    Code: String,
    Owner: String,
    Votes: String
})

module.exports = model("session_setup", SessionSchema);