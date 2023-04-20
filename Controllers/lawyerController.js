const User = require('../Models/Users');
const jwt = require('jsonwebtoken');

// Write all the Controllers for the Lawyer side


// this will have 2 functions first of all

// one for accepting the friend request that will change the arrays

// one for deleting the friend request that will remove the 

const acceptRequest = (req, res) =>{
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "Sweater Weather", async(err, decodedToken) => {
            if (err){
                console.log(err.message);
            }
            else{

                await User.findByIdAndUpdate(
                    decodedToken.id,
                    {
                        $push: {'profile.requestAccepted': req.body.id}
                    }
                )

                await User.findByIdAndUpdate(
                    decodedToken.id,
                    {
                        $pull: {'profile.requestPending': req.body.id}
                    }
                )
                
                await User.findByIdAndUpdate(
                    req.body.id,
                    {
                        $push:{'profile.requestAccepted': decodedToken.id}
                    }
                )
                await User.findByIdAndUpdate(
                    req.body.id,
                    {
                        $pull:{'profile.requestPending': decodedToken.id}
                    }
                )
            }
        })
    }
}

const declineRequest = (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, "Sweater Weather", async(err, decodedToken) => {
            if (err){
                console.log(err.message);
            }
            else{
                await User.findByIdAndUpdate(
                    decodedToken.id,
                    {
                        $pull: {'profile.requestPending': req.body.id}
                    }
                )

                await User.findByIdAndUpdate(
                    req.body.id,
                    {
                        $pull: {'profile.requestPending': decodedToken.id}
                    }
                )
            }
        })
    }
}

module.exports = {acceptRequest, declineRequest};