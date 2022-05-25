const path = require('path');

const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const bcrypt = require('bcrypt');
const session = require('express-session');

const helpers = require('./utils/helpers')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Not so secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs =exphbs.create({ helpers });


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