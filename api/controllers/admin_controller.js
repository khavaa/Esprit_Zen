const bcrypt = require('bcrypt');
const Admin = require('../models/admin_model');

module.exports = {
    registerAdmin: async (req, res) => {
        try {
            const { emailAdm, passwordAdm } = req.body;

            // Debug: log the received values
            console.log('Received values:', { emailAdm, passwordAdm });

            // Create the user with the correct field names
            const admin = await Admin.create({ email: emailAdm, password: passwordAdm });

            // Debug: log the created user
            console.log('Admin created:', admin);

            res.redirect('/connexion');
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
            req.session.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
            res.redirect('/04062024');
        }
    },
    loginAdmin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Debug: log the received values
            console.log('Login received values:', { email, password });

            const admin = await Admin.findOne({ where: { email } });

            if (admin && bcrypt.compareSync(password, admin.password)) {
                req.session.adminId = admin.id;
                req.session.adminEmail = admin.email;  // Stocker l'email de l'administrateur dans la session
                req.session.isAdmin = true; // Définir isAdmin à true
                res.redirect('/');
            } else {
                req.session.errorMessage = 'Email ou mot de passe incorrect.';
                res.redirect('/c04062024');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion de l\'administrateur :', error);
            req.session.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
            res.redirect('/c04062024');
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}
