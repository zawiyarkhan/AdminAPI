// import jwt from 'jsonwebtoken';
// import User from '../../Models/Users';
const jwt = require('jsonwebtoken');
const User = require('../../Models/Users');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'Sweater Weather', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.send('There is some error while loggin In');
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect('Please login to continue');
    }
  };

// export default requireAuth;
module.exports = requireAuth;