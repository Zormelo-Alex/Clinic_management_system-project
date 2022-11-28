const mongoose = require("mongoose");

const medDataShema = new mongoose.Schema({
    pID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    BP: {
        type: mongoose.SchemaTypes.String
    },
    weight: {
        type: mongoose.SchemaTypes.String
    },
    knownCondition: {
        type: mongoose.SchemaTypes.String
    },
    knownCondition1: {
        type: mongoose.SchemaTypes.String
    },
    knownCondition2: {
        type: mongoose.SchemaTypes.String
    },
    knownCondition3: {
        type: mongoose.SchemaTypes.String
    },
    info: {
        type: mongoose.SchemaTypes.String
    },
    testInfo: {
        type: mongoose.SchemaTypes.String
    },
    genotype: {
        type: mongoose.SchemaTypes.String
    },
    bloodtype: {
        type: mongoose.SchemaTypes.String
    },
    diagnosis: {
        type: mongoose.SchemaTypes.String
    },
    diagnosisNotes: {
        type: mongoose.SchemaTypes.String
    },
    prescription: {
        type: mongoose.SchemaTypes.String
    }
});

const medData = mongoose.model("medData", medDataShema);


module.exports = medData;