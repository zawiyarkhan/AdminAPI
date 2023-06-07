const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');

const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const admin = await Admin.login(email, password);
        const token = createToken(admin._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
        res.send(token);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {Login}