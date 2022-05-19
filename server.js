const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const helpers = require('./utils/helpers')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

const hbs =exphbs.create({ helpers });

const initializePassport = require('./passport-config.js');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

// const users = []

// app.set('view-engine', 'ejs')
// app.use(express.urlencoded({ extended: false }));
// app.use(flash());
// app.use(session({
    
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))

// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// turn on routes
app.use(routes);

// turn on connection to db and server
// if force is set to 'true' in sequelize.sync the tables recreate if there
// is a new association created
sequelize.sync({ force:  false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at port: ' + PORT));
});