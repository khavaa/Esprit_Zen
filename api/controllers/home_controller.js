const admin_model = require('../models/admin_model');
const user_model = require('../models/user_model');
const appointment_model = require('../models/appointment_model');
const article_model = require('../models/article_model');
const comment_model = require('../models/comment_model');
const video_model = require('../models/video_model');

module.exports = {
  getArticle: async (req, res) => {
    res.render('article');
  },
  getConnexion: async (req, res) => {
    res.render('connexion');
  },
  getCours: async (req, res) => {
    res.render('cours');
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
};
