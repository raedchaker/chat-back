var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    active: {
        type: Boolean,
        default: true,
    },
    socket: {

    }
});

module.exports = mongoose.model("Room", RoomSchema);
