const mongoose = require('mongoose');



const LawyerSchema = mongoose.Schema({
    // email:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validator: {isEmail}
    // },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 6,
    // },

    name:{
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },
    currentFirm: {
        type: String,
        required:true,
    },
    highestEducationalDegree: {
        type: String,
        required: true
    },
    accredationInstitute: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    currentPosition: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    openToTravel: {
        type: Boolean,
        required: true,
    },

});

const Lawyer = mongoose.model('Lawyers', LawyerSchema);

module.exports = Lawyer;