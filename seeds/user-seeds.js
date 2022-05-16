const { User } = require('../models');

const userData = [
  {
    username: 'Thor',
    email:  'Thor@gmail.com',
    password: '12345'
  },
  {
    username: 'Iron Man',
    email:  'IronMan@gmail.com',
    password: '12345'
  },
  {
    username: 'Hulk',
    email:  'Hulk@gmail.com',
    password: '12345'
  },
  {
    username: 'Black Widow',
    email:  'BlackWidow@gmail.com',
    password: '12345'
  },
  {
    username: 'Spiderman',
    email:  'Spiderman@gmail.com',
    password: '12345'
  },
];

const seedUsers= () => User.bulkCreate(userData);

module.exports = seedUsers;
