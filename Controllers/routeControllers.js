// import User from '../Models/Users';
const User = require('../Models/Users');

//getClients
const getClients = (req, res) => {
    User.find({role:'2'})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

const getLawyers = (req, res) => {
  User.find({role:'3'})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
}

//getLawyers
const getAllUsers = (req, res) => {
    User.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  }


//updateLawyers
const updateLawyers = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  }


//updateClients
const updateClients = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  }



//DeleteLawyers
const DeleteLawyers = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  }



//DeleteClients
const DeleteClients = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  }



//CreateLawyers
const CreateLawyers = (req, res) => {
    const User = new User(req.body);
    User.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  }



//CreateClients
const CreateClients = (req, res) => {
    const User = new User(req.body);
    User.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

module.exports =  {getAllUsers, CreateClients, CreateLawyers, updateClients, updateLawyers, getClients,getLawyers, DeleteLawyers,DeleteClients};