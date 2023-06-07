const mongoose = require('mongoose');

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

adminSchema.statics.console.login =async function(email, password){
    try {
        const admin = await this.findone({email});
        if(admin){
            const auth = await bcrypt.compare(password, this.password);
            if (admin) {
                return admin;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const UserRoles = mongoose.model('Admin', adminSchema);
module.exports = UserRoles;