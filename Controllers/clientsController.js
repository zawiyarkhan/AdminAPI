const User = require('../Models/Users');
const jwt = require('jsonwebtoken');

// Get All Lawyers

const allLawyers = async(req, res) => {
    User.find({role : '3'})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
}


// Get Lawyers by Location
const LawyersByLocation = (req,res) =>{
    User.find({
        $and: [
            {role: '2'},
            {City: req.body}
        ]
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
}

// Get Lawyers by Location and experience for the survey before the website starts

const LawyersByLocationAndExpertise = (req,res) =>{
    User.find({
        $and: [
            {role: '2'},
            {City: req.body.City},
            {currentPosition: req.body.currentPosition}
        ]
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    })
}


// send a request to the lawyers

const sendRequest = (req, res) =>{
    // verify the token and send the request to lawyer
    console.log("hello");

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'Sweater Weather', async(err, decodedToken) => {
            if (err) {
                console.log(err.message);
            }
            else {
                User.findByIdAndUpdate(
                    req.body.id,
                    {
                        $push: {'profile.requestPending':{id:decodedToken.id, message:req.body.message}}
                    }
                )
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    console.log(err);
                })

                User.findByIdAndUpdate(
                    decodedToken.id,
                    {
                        $push: {'profile.requestPending': {id: req.body.id, message: req.body.message}}
                    }
                )
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    res.send(result);
                })
            }
        })
    }

    // okay so you make 2 arrays

    // request sent array in the lawyers schema, that will be populated first when client sends a request

    // the lawyer will see all the requests in the page

    // another request will be made when the lawyers accepts or rejects the request

    // if request is accepted the lawyer the client id will go into the friends list

    // if it is rejected the cliend id will be removed from the request array
}



// We will add a field for when the client decided to out forward his case request


// the lawyer will then again make the same thing kinda like chat or email maybe but not real time

// take the survey for the thing


module.exports = {sendRequest, LawyersByLocation,LawyersByLocationAndExpertise, allLawyers};