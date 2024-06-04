const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const home_controller = require('./controllers/home_controller');
const user_controller = require('./controllers/user_controller');
const comment_controller = require('./controllers/comment_controller');

// Middleware to pass error messages from session to response locals
router.use((req, res, next) => {
    res.locals.errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    next();
});

// *********   Route vers les différentes pages ***************
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
    .get(home_controller.getRdv);

// ***** Deconnxion ********
router.route('/logout')   
    .get(user_controller.logout)
    
// ***** Route pour supprimer un commentaire ********
router.route('/cours/delete/:commentId')
    .post(comment_controller.delete);   

module.exports = router;
