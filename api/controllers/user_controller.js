const bcrypt = require('bcrypt');
const User = require('../models/user_model');

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password } = req.body;

            // Debug: log the received values
            console.log('Received values:', { firstname, lastname, email, phone, password });

            // Create the user with the correct field names
            const user = await User.create({ firstname, lastname, email, phone_number: phone, password });

            // Debug: log the created user
            console.log('User created:', user);

            req.session.userId = user.id;
            req.session.email = user.email;  // Stocker l'email dans la session
            console.log('Session userId set:', req.session.userId);

            res.redirect('/connexion');
        } catch (error) {
            console.error('Erreur lors de l\'inscription de l\'utilisateur :', error);
            req.session.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
            res.redirect('/inscription');
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Debug: log the received values
            console.log('Login received values:', { email, password });

            const user = await User.findOne({ where: { email } });

            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id;
                req.session.email = user.email;  // Stocker l'email dans la session
                res.redirect('/');
            } else {
                req.session.errorMessage = 'Email ou mot de passe incorrect.';
                res.redirect('/connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion de l\'utilisateur :', error);
            req.session.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
            res.redirect('/connexion');
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    },
    getUser: async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'firstname', 'lastname', 'email', 'phone_number'],
                order: [['createdAt', 'DESC']]
            });
            console.log('Users retrieved from the database:', users);
            req.users = users.map(user => user.toJSON()); // Mettre les utilisateurs dans req.users
            next(); // Appeler le middleware suivant
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            res.status(500).send('Erreur lors de la récupération des utilisateurs');
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!userId) {
                return res.status(400).send('User ID is required');
            }

            await User.destroy({
                where: { id: userId }
            });

            res.redirect('/administration');
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
        }
    }
}
