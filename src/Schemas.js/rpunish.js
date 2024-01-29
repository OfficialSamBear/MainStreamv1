const { Schema, model } = require('mongoose');

let RPunishSchema = new Schema({
    Guild: String,
    GuildId: String,
    Channel: String
})

module.exports = model("roblox_punish_logs", RPunishSchema);