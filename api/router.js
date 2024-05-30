const express = require('express');
const router = express.Router();

const home_controller = require('./controllers/home_controller');

router.route('/article')
    .get(home_controller.getArticle);

router.route('/connexion')
    .get(home_controller.getConnexion);

router.route('/cours')
    .get(home_controller.getCours);    

router.route('/')
    .get(home_controller.getHome);

router.route('/inscription')
    .get(home_controller.getInscription);

router.route('/planning')
    .get(home_controller.getPlanning);

router.route('/rdv')
    .get(home_controller.getRdv);


module.exports = router;
