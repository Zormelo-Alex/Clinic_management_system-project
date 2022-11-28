const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    dateAdded: {
        type: mongoose.SchemaTypes.Date,
        default: new Date(),
        required: true
    },
    gender: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    contact: {
        type: mongoose.SchemaTypes.String
    },
    pID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    dob: {
        type: mongoose.SchemaTypes.String
    },
    address: {
        type: mongoose.SchemaTypes.String
    },
    emergency: {
        type: mongoose.SchemaTypes.String
    },
    maritalStatus: {
        type: mongoose.SchemaTypes.String
    }
});

const Patients = mongoose.model( "Patients", patientSchema);

module.exports = Patients;