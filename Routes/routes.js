const express = require('express');
const authControllers = require('../Controllers/authControllers');
const routeControllers =require('../Controllers/routeControllers');
const clientControllers = require('../Controllers/clientsController');
const requireAuth = require('../Controllers/middleware/authMiddleware');
const lawyerControllers = require('../Controllers/lawyerController');
const calendarControllers = require('../Controllers/gCallenderController');
const router = express.Router();


// Admin routes
router.post('/SignUp', authControllers.SignUp)
router.post('/login', authControllers.Login);
router.post('/logout', authControllers.Logout);
router.post('/updateClient', authControllers.updateClient);
router.post('/updateLawyer', authControllers.updateLawyer);
//router.put('/updateInfo', authControllers.UpdatingInfo);
router.get('/getClients',requireAuth, routeControllers.getClients);
router.get('/getLawyers',requireAuth, routeControllers.getLawyers);
router.put('/updateClients',requireAuth, routeControllers.updateClients);
router.put('/updateLawyers',requireAuth, routeControllers.updateLawyers);
router.delete('/DeleteClients',requireAuth, routeControllers.DeleteClients);
router.delete('/DeleteLawyers',requireAuth, routeControllers.DeleteLawyers);
router.post('/CreateClients',requireAuth, routeControllers.CreateClients);
router.post('/CreateLawyers',requireAuth, routeControllers.CreateLawyers);
router.put('/sendRequest', clientControllers.sendRequest);
router.put('/accept', lawyerControllers.acceptRequest);
router.put('/reject', lawyerControllers.declineRequest);



// Google Calender routes
// router.post('/insertEvent', requireAuth, calendarControllers.insertEvent);
// router.get('/getEvents', requireAuth, calendarControllers.getEvents);
// router.delete('/DeleteEvents', requireAuth, calendarControllers.deleteEvent);


// Chat routes



module.exports =  router;