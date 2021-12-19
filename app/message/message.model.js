var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Room'
    },
    content: String,
},{ timestamps: true });
module.exports = mongoose.model("Message", MessageSchema);