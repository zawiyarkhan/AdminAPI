const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        validate:[isEmail]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: {
        type: String,
        required: true
    }
});

adminSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.statics.login =async function(email, password){
    console.log(email);
    console.log(password);
    try {
        const admin = await this.findOne({email: email});
        console.log("admin: ",admin);
        if(admin){
            console.log("hello there")
            const auth = await bcrypt.compare(password, admin.password);
            console.log("auth: ",auth)
            if (auth) {
                return admin;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const UserRoles = mongoose.model('Admin', adminSchema);
module.exports = UserRoles;