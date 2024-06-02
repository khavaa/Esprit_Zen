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
    }
}
