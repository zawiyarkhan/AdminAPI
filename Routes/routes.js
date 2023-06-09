const express = require('express');
const authControllers = require('../Controllers/authControllers');
const routeControllers =require('../Controllers/routeControllers');
const requireAuth = require('../Controllers/middleware/authMiddleware');

const router = express.Router();

router.post('/SignUp', authControllers.SignUp)
router.post('/login', authControllers.Login);
router.post('/logout', authControllers.Logout);
router.get('/getClients',requireAuth, routeControllers.getClients);
router.get('/getLawyers',requireAuth, routeControllers.getLawyers);
router.put('/updateClients',requireAuth, routeControllers.updateClients);
router.put('/updateLawyers',requireAuth, routeControllers.updateLawyers);
router.delete('/DeleteClients',requireAuth, routeControllers.DeleteClients);
router.delete('/DeleteLawyers',requireAuth, routeControllers.DeleteLawyers);
router.post('/CreateClients',requireAuth, routeControllers.CreateClients);
router.post('/CreateLawyers',requireAuth, routeControllers.CreateLawyers);

module.exports =  router;