const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');


const maxage = 4 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'Sweater Weather', {
        expiresIn: maxage
    });
};


const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const admin = await Admin.login(email, password);
        const token = createToken(admin._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
        res.send("User Logged In");
    } catch (error) {
        console.log(error);
    }
}

const SignUp = async (req,res) =>{

    const {email, password, name} = req.body;
    try {

        const admin = await Admin.create({email, password, name})
        const token = createToken(admin._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
        console.log(token)
        res.status(201).json({user:admin._id})
        res.send("created")
        
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {Login, SignUp}