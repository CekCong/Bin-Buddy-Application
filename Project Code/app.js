const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mongoose = require('mongoose');

require('dotenv').config();

const hbsHelpers = require('./helpers/hbs');
const mainRoute = require('./routes/router');
const authRoute = require('./routes/authRoute');
const reminderRoutes = require('./routes/reminderRoutes');
const queryRoute = require('./routes/queryRoutes');
const passwordRoute = require('./routes/passwordRoute');
const articleRoutes = require('./routes/articleRoutes');
const mapRoutes = require('./routes/mapRoutes');
const adminQueryRoutes = require('./routes/adminQueryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = create({
    defaultLayout: 'base',
    extname: '.handlebars',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        ...hbsHelpers,
        eq(a, b) {
            return a === b;
        },
        json(context) {
            return JSON.stringify(context);
        }
    }
});

app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not configured');
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URI
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(flash());

app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.user = {
            name: req.session.user.name,
            email: req.session.user.email,
            profilePicture: req.session.user.profilePicture,
            isAdmin: req.session.user.isAdmin
        };
    }

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.info_msg = req.flash('info_msg');

    next();
});

app.use('/', mainRoute);
app.use('/', authRoute);
app.use('/', passwordRoute);
app.use('/reminder', reminderRoutes);
app.use('/query', queryRoute);
app.use('/articles', articleRoutes);
app.use('/map', mapRoutes);
app.use('/adminQuery', adminQueryRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}

module.exports = app;
