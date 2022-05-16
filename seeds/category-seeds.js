const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Automotive',
  },
  {
    category_name: 'Clothing',
  },
  {
    category_name: 'Electronics',
  },
  {
    category_name: 'Home',
  },
  {
    category_name: 'Outdoors',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
