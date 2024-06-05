// router.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const home_controller = require('./controllers/home_controller');
const user_controller = require('./controllers/user_controller');
const appointment_controller = require('./controllers/appointment_controller');
const comment_controller = require('./controllers/comment_controller');

// Middleware to pass messages from session to response locals
router.use((req, res, next) => {
    res.locals.errorMessage = req.session.errorMessage;
    res.locals.successMessage = req.session.successMessage;
    res.locals.isLoggedIn = !!req.session.userId;
    res.locals.isAdmin = req.session.isAdmin || false;
    delete req.session.errorMessage;
    delete req.session.successMessage;
    next();
});

router.route('/article')
    .get(home_controller.getArticle);

router.route('/connexion')
    .get(home_controller.getConnexion)
    .post(user_controller.loginUser); //connexion user

router.route('/cours')
    .get(comment_controller.getComments) // Utiliser la méthode getComments
    .post(comment_controller.post); // ajout de la route pour poster un commentaire  

router.route('/')
    .get(home_controller.getHome);

router.route('/inscription')
    .get(home_controller.getInscription)
    .post(user_controller.registerUser); //création du compte de l'utilisateur

router.route('/planning')
    .get(home_controller.getPlanning);

router.route('/rdv')
    .get(home_controller.getRdv)
    .post(appointment_controller.createAppointment);

router.route('/04062024')
    .get(home_controller.getAdminAccount)
    .post(home_controller.getAdminAccount);

router.route('/c04062024')
    .get(home_controller.getAdminConnect)
    .post(home_controller.getAdminConnect);

    router.route('/administration')
    .get(home_controller.getAdministration);

// ********** Deconnexion ***************
router.route('/logout')
    .get(user_controller.logout); //deco user

router.route('/logoutAdm')
    .get(home_controller.getAdminConnect); //deco admin

// ********** suppression des commentaires ***************

router.route('/cours/delete/:commentId')
    .post(comment_controller.delete);  

// ********** suppression des rdv ***************
router.route('/administration/delete/:appointmentId')
    .post(appointment_controller.delete);

// ********** suppression des user ***************    
router.route('/administration/deleteUser/:userId')
    .post(user_controller.deleteUser);

module.exports = router;
