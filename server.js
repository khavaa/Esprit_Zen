const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const config = require('./config');
const router = require('./api/router');

const app = express();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main', // Default layout file
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Directory for layouts
    partialsDir: path.join(__dirname, 'views', 'partials'), // Directory for partials
    helpers: {
        ifCond: function(v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'hbs');

app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));

try {
    config.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
} catch (error) {
    console.error('Database Connection Error:', error);
    process.exit(1); // Exit the application if unable to connect to the database
}

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.urlencoded({ extended: true }));
// Middleware pour analyser les données JSON des requêtes
app.use(express.json());

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },
    store: new SequelizeStore({
        db: config.sequelize
    }),
}));

app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.userId;
    res.locals.email = req.session.email;  // Ajoutez cette ligne si vous voulez passer l'email de l'utilisateur connecté
    next();
});

app.use('/', router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
