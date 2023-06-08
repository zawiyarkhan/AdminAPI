const express = require('express');
const authControllers = require('../Controllers/authControllers');
const routeControllers =require('../Controllers/routeControllers');
const clientControllers = require('../Controllers/clientsController');
const requireAuth = require('../Controllers/middleware/authMiddleware');
const lawyerControllers = require('../Controllers/lawyerController');
const calendarControllers = require('../Controllers/gCallenderController');
const router = express.Router();
const chatController = require('../Controllers/chatController');
const AdminController = require('../Controllers/adminController');





// Admin routes //Auth Routes
router.post('/SignUp', authControllers.SignUp)
router.post('/login', authControllers.Login);
router.post('/logout', authControllers.Logout);
router.put('/updateClient', authControllers.updateClient);
router.put('/updateLawyer', authControllers.updateLawyer);



// CRUD routes
router.get('/getClients', routeControllers.getClients);
router.get('/getLawyers', routeControllers.getLawyers);
router.get('/getAll', routeControllers.getAllUsers);
router.put('/updateClients/:id',requireAuth, routeControllers.updateClients);
router.put('/updateLawyers/:id',requireAuth, routeControllers.updateLawyers);
router.delete('/Delete/:id', routeControllers.DeleteClients);
router.post('/CreateClients',requireAuth, routeControllers.CreateClients);
router.post('/CreateLawyers',requireAuth, routeControllers.CreateLawyers);

// Client Routes
router.get('/allLawyers', clientControllers.allLawyers);
router.get('/LawyerbyLoc', clientControllers.LawyersByLocation );
router.get('/allLawyers', clientControllers.LawyersByLocationAndExpertise);

router.post('/LoginAdmin', AdminController.Login);
router.post('/SignUpAdmin', AdminController.SignUp);

// Friend Request routes
router.put('/sendRequest', clientControllers.sendRequest);
router.put('/accept', lawyerControllers.acceptRequest);
router.put('/reject', lawyerControllers.declineRequest);
router.put('/deleteRequest', lawyerControllers.updateDeleteRequest);
router.put('/acceptRequest', lawyerControllers.updateRequestArray);


// Google Calender routes
// router.post('/insertEvent', requireAuth, calendarControllers.insertEvent);
// router.get('/getEvents', requireAuth, calendarControllers.getEvents);
// router.delete('/DeleteEvents', requireAuth, calendarControllers.deleteEvent);


// Chat routes
router.post('/authenticate', chatController.authenticate);


module.exports =  router;