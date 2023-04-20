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

    const {email, password, role} = req.body;
    try {

        

        if (req.body.role == '2'){
            const user = await User.create({email, password, role})
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
            console.log(token)
            res.redirect('/updateClient')
        }
        if (req.body.role == '3'){
            const user = await User.create({email, password, role})
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
            console.log(token);
            res.redirect('/updateLawyer')
        }

        // const token = createToken(user._id);
        // res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});
        // res.json({user: token});
        
    } catch (error) {
        console.log(error);
    }
}

// updating the Lawyers/Clients object in the user table

const updateClient = async (req,res) =>{
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'Sweater Weather', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message)
                }
                else{

                    const client = new Client(req.body);

                    let user = User.findByIdAndUpdate(decodedToken.id, {profile: client}, {
                        new: false
                    })
                    .then(result => {
                        res.send(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}




const updateLawyer = async (req,res) =>{
    try {
        const token = req.cookies.jwt;
        if (token) {
            jwt.verify(token, 'Sweater Weather', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message)
                }
                else{

                    const lawyer = new Lawyer(req.body);

                    let user = User.findByIdAndUpdate(decodedToken.id, {profile: lawyer}, {
                        new: false
                    })
                    .then(result => {
                        res.send(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}






// const UpdatingInfo = async (req, res) => {
//     try {
//         const token = req.cookies.jwt
//         console.log(token)
//         if (token) {
//             console.log("hello")
//             jwt.verify(token, 'Sweater Weather', async (err, decodedToken) =>{
//                 if (err) {
//                     console.log("nothing")
//                     console.log(err.message)
//                 }
//                 else{
//                     console.log('heyy')
//                     console.log(decodedToken)
//                     let user = User.findById(decodedToken.id)
//                     user.toJson
//                     console.log(user['schema']['tree'])
                    
//                     //console.log(user)
//                     if (user.role == '2') {
//                         console.log('nope')
//                         const lawyer = new Lawyer(req.body)
//                         User.findByIdAndUpdate(decodedToken,{profile: lawyer},{
//                             new: false
//                         })
//                         .then(result => {
//                             res.send(result)
//                         })
//                         .catch(err => {
//                             console.log(err)
//                         })
//                     }
//                     if (user.role == '3') {
//                         const client = new Client(req.body)
//                         User.findByIdAndUpdate(decodedToken, {profile: client}, {
//                             new: false
//                         })
//                         .then(result => {
//                             res.send(result)
//                         })
//                         .catch(err => {
//                             console.log(err)
//                         })
//                     }
//                 }
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }



// login post

const Login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxage * 1000});

        if (user.role == '2'){
            res.send('Clients Homepage')
        }
        if(user.role == '3'){
            res.send('Lawyers Homepage')
        }

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

module.exports = {Login, Logout, SignUp, updateClient, updateLawyer};