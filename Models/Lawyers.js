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

    },

    contact: {
        type: String,

    },
    currentFirm: {
        type: String,

    },
    highestEducationalDegree: {
        type: String,

    },
    accredationInstitute: {
        type: String,
    
    },
    experience: {
        type: String,
    
    },
    currentPosition: {
        type: String,
    },
    City: {
        type: String,
    },
    openToTravel: {
        type: Boolean,
    },
    requestPending : [{
        type: Object
    }],

    requestAccepted : [{
        type: Object
    }]



});

const Lawyer = mongoose.model('Lawyers', LawyerSchema);

module.exports = Lawyer;