const mongoose = require('mongoose');


const ClientSchema = mongoose.Schema({
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

    age: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    

});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;