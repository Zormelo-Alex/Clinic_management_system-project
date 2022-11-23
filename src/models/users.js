const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    dob: {
        type: mongoose.SchemaTypes.Date
    },
    empID: {
        type: mongoose.SchemaTypes.String
    },
    gender: {
        type: mongoose.SchemaTypes.String
    },
    role: {
        type: mongoose.SchemaTypes.String
    },
    nationality: {
        type: mongoose.SchemaTypes.String
    },
    pob: {
        type: mongoose.SchemaTypes.String
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
    emergency1: {
        type: mongoose.SchemaTypes.String
    },
    emergency2: {
        type: mongoose.SchemaTypes.String
    },
    address1: {
        type: mongoose.SchemaTypes.String
    },
    address2: {
        type: mongoose.SchemaTypes.String
    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;