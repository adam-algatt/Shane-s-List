const { Post } = require('../models');

const postData = [
  {
    post_user_id: 1,
    title:  'Immaculate Audi 2012 A4',
    description: 'Fully loaded with all the options.  Low miles.  One owner.  $8800',
    product_category: 1
  },
  {
    post_user_id: 2,
    title:  'Camping gear',
    description: 'Six man tent, cookstove, cooler, 4 sleeping bags.  $50',
    product_category: 2
  },
  {
    post_user_id: 3,
    title:  'Leather jacket',
    description: 'Black leather jacket.  Size large.  Rarely worn.  $30',
    product_category: 3
  },
  {
    post_user_id: 4,
    title:  'Coffee Maker',
    description: 'Like new Mr. Coffee coffeemaker.  Black with stainless steel carafe.  $10',
    product_category: 4
  },
  {
    post_user_id: 5,
    title:  'Sony Playstation',
    description: 'Still in box.  $40.',
    product_category: 5
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
