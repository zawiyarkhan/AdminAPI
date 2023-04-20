const mongoose = require('mongoose');


const ClientSchema = mongoose.Schema({

    name:{
        type: String,
        
    },

    age: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    contactNo: {
        type: String,
        
    },
    requestPending : [{type: mongoose.Schema.Types.ObjectId, ref:"Users"}],
    requestAccepted: {type:mongoose.Schema.Types.ObjectId, ref: 'Users'}
    

});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;