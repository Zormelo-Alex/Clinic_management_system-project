const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    dateAdded: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    contact: {
        type: mongoose.SchemaTypes.String
    },
    email: {
        type: mongoose.SchemaTypes.String
    },
    address: {
        String
    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;