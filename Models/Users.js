const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt')
const UserTableSchema= mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validator : [isEmail]
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum : ['1','2','3'],
    },
    profile: {
        type: Object
    }
})
UserTableSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserTableSchema.statics.login =async function(email, password){
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
const Users = mongoose.model('Users', UserTableSchema);
module.exports = Users;