var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
});
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);