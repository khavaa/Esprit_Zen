const Admin = require('../models/admin_model');
const User = require('../models/user_model');
const Appointment = require('../models/appointment_model');
const Article = require('../models/article_model');
const Comment = require('../models/comment_model');
const Video = require('../models/video_model');

const appointmentController = require('./appointment_controller'); // Importez le contrôleur des rendez-vous
const userController = require('./user_controller'); // Importez le contrôleur des utilisateurs

module.exports = {
    getArticle: async (req, res) => {
        res.render('article');
    },
    getConnexion: async (req, res) => {
        res.render('connexion');
    },
    getHome: async (req, res) => {
        res.render('home');
    },
    getInscription: async (req, res) => {
        res.render('inscription');
    },
    getPlanning: async (req, res) => {
        res.render('planning');
    },
    getRdv: async (req, res) => {
        res.render('rdv');
    },
    getCours: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                include: [{ model: User, attributes: ['firstname'] }],
                order: [['createdAt', 'DESC']]
            });
            res.render('cours', {
                comments: comments,
                isLoggedIn: !!req.session.userId,
                currentUserId: req.session.userId
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des cours :', error);
            res.status(500).send('Erreur lors de la récupération des cours');
        }
    },
    getAdminAccount: async (req, res) => {
        res.render('04062024');
    },
    getAdminConnect: async (req, res) => {
        res.render('c04062024');
    },
    getAdministration: async (req, res) => {
        try {
            const appointments = await appointmentController.getRdv(req, res, () => {});
            const users = await userController.getUser(req, res, () => {});
            res.render('administration', {
                isAdmin: true,
                appointments: req.appointments || [],
                users: req.users || []
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous et utilisateurs :', error);
            res.status(500).send('Erreur lors de la récupération des rendez-vous et utilisateurs');
        }
    }
};