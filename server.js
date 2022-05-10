require('dotenv').config()
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// if force is set to 'true' in sequelize.sync the tables recreate if there
// is a new association created
sequelize.sync({ force:  true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at port:  ${PORT}`));
});