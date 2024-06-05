const Appointment = require('../models/appointment_model');

module.exports = {
    createAppointment: async (req, res) => {
        try {
            const { lastname_rdv, firstname_rdv, number_rdv, date, time } = req.body;
            await Appointment.create({
                lastname: lastname_rdv,
                firstname: firstname_rdv,
                phone_number: number_rdv,
                date_meeting: date,
                hour_meeting: time
            });
            req.session.successMessage = 'Votre demande de rendez-vous est bien enregistrée.';
            res.redirect('/rdv');
        } catch (error) {
            console.error('Erreur lors de la création du rendez-vous :', error);
            req.session.errorMessage = 'Erreur lors de la création du rendez-vous. Veuillez réessayer.';
            res.redirect('/rdv');
        }
    },
    getRdv: async (req, res, next) => {
        try {
            const appointments = await Appointment.findAll({
                attributes: ['id', 'lastname', 'firstname', 'phone_number', 'date_meeting', 'hour_meeting'],
                order: [['createdAt', 'DESC']]
            });
            console.log('Appointments retrieved from the database:', appointments);
            req.appointments = appointments.map(appointment => appointment.toJSON()); // Mettre les rendez-vous dans req.appointments
            next(); // Appeler le middleware suivant
        } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous :', error);
            res.status(500).send('Erreur lors de la récupération des rendez-vous');
        }
    },
    delete: async (req, res) => {
        try {
            const appointmentId = req.params.appointmentId;
            await Appointment.destroy({
                where: {
                    id: appointmentId
                }
            });
            res.redirect('/administration');
        } catch (error) {
            console.error('Erreur lors de la suppression du rendez-vous :', error);
            res.status(500).send('Erreur lors de la suppression du rendez-vous');
        }
    }
};
