const express = require('express');
const authControllers = require('../Controllers/authControllers');
const routeControllers =require('../Controllers/routeControllers');
const clientControllers = require('../Controllers/clientsController');
const requireAuth = require('../Controllers/middleware/authMiddleware');
const lawyerControllers = require('../Controllers/lawyerController');
const calendarControllers = require('../Controllers/gCallenderController');
const router = express.Router();




// Admin routes //Auth Routes
router.post('/SignUp', authControllers.SignUp)
router.post('/login', authControllers.Login);
router.post('/logout', authControllers.Logout);
router.put('/updateClient', authControllers.updateClient);
router.put('/updateLawyer', authControllers.updateLawyer);



// CRUD routes
router.get('/getClients',requireAuth, routeControllers.getClients);
router.get('/getLawyers',requireAuth, routeControllers.getLawyers);
router.put('/updateClients',requireAuth, routeControllers.updateClients);
router.put('/updateLawyers',requireAuth, routeControllers.updateLawyers);
router.delete('/DeleteClients',requireAuth, routeControllers.DeleteClients);
router.delete('/DeleteLawyers',requireAuth, routeControllers.DeleteLawyers);
router.post('/CreateClients',requireAuth, routeControllers.CreateClients);
router.post('/CreateLawyers',requireAuth, routeControllers.CreateLawyers);


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



module.exports =  router;