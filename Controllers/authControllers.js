const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const Lawyer = require('../Models/Lawyers');
const Client = require('../Models/Clients');



// jwt web token
const maxage = 4 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'Sweater Weather', {
        expiresIn: maxage
    });
};


// signUp post

const SignUp = async (req,res) =>{

    try {
        if (req.body.role == '2'){
            var lawyer;
            // const user = await User.create(req.body);
            Lawyer.findById()
                .then(result => {
                    lawyer = result;
                })
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                profile: lawyer
            })
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
            res.json({user: user._id});
        }
        
        else if(req.body.role == '3'){
            var client;
            Client.findById()
                .then(result => {
                    lawyer = result;
                })
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                profile: lawyer
            })
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
            res.json({user: user._id});
        }
        
    } catch (error) {
        console.log(error);
    }
}

// login post

const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        console.log(user)
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});

        res.send(token);
    } catch (error) {
        console.log(error);
    }
}


// logout get
const Logout = (req, res)=>{
    res.cookie('jwt', "", {maxAge:1});
    // res.send('jwt', "", {maxAge:1})
    res.send("User logged out");
}

module.exports = {Login, Logout, SignUp};