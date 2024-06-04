const Comment = require('../models/comment_model');
const User = require('../models/user_model'); // Importation du modèle User

module.exports = {
    post: async (req, res) => {
        try {
            const newComment = await Comment.create({
                content: req.body.comment,
                userId: req.session.userId
            });
            res.redirect('back');
        } catch (error) {
            console.error('Erreur lors de la création du commentaire :', error);
            res.status(500).send('Erreur lors de la création du commentaire');
        }
    },
    getComments: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                include: [{ model: User, attributes: ['firstname'] }],
                order: [['createdAt', 'DESC']]
            });
            res.render('cours', {
                comments: comments.map(comment => comment.toJSON()),
                isLoggedIn: !!req.session.userId,
                currentUserId: req.session.userId
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error);
            res.status(500).send('Erreur lors de la récupération des commentaires');
        }
    },
    delete: async (req, res) => {
        try {
            await Comment.destroy({
                where: {
                    id: req.params.commentId,
                    userId: req.session.userId
                }
            });
            res.redirect('back');
        } catch (error) {
            console.error('Erreur lors de la suppression du commentaire :', error);
            res.status(500).send('Erreur lors de la suppression du commentaire');
        }
    }
};
