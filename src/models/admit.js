const mongoose = require("mongoose");

const admitPatientSchema = new mongoose.Schema({
    pID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    dateAdmitted: {
        type: mongoose.SchemaTypes.Date
    },
    dateDischarged: {
        type: mongoose.SchemaTypes.Date
    }
});

const admitPatient = mongoose.model("admitPatient", admitPatientSchema);


module.exports = admitPatient;