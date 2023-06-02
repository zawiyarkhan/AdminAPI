const User = require('../Models/Users');
const jwt = require('jsonwebtoken');
const axios = require('axios');


const authenticate = (req, res) =>{
    const token = req.cookies.jwt;
    var user;
    if (token) {
        jwt.verify(token, "Sweater Weather", async(err, decodedToken) => {
            if (err){
                console.log(err.message);
            }
            else{
                console.log(decodedToken)
                try {

                    User.findByIdAndUpdate(decodedToken.id)
                    .then(result=>{
                        console.log("result: ",result.profile.name);
                        axios.put(
                            "https://api.chatengine.io/users/",
                            {username: result.profile.name, secret: decodedToken.id, first_name: result.profile.name},
                            {headers: {"private-key": "ff7441e8-a47b-4ada-a5c6-95522e65a3a2"}}
                        )
                        .then((result) => {
                            res.status(result.status).json(result.data)
                        })
                        .catch((err) =>{
                            res.json(err.message);
                        })
                    })
                
                } catch (error) {
                    // return res.json(error.message)
                }
            }
        })
    }
}

module.exports = {authenticate}

