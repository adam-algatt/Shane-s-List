const User = require('./User');
const Post = require('./Product');
const Comment = require('./Comment');

// // create assoc btwn user and products
User.belongsToMany(Product, {
  through: Comment,
  as: 'commented_products',
  foreignKey: 'user_id'
});

Product.belongsToMany(User, {
  through: Comment,
 as: 'commented_products',
  foreignKey: 'product_id'
});

// Comment.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// Comment.belongsTo(Product, {
//   foreignKey: 'product_id'
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id'
// });

// Product.hasMany(Comment, {
//   foreignKey: 'product_id'
// });

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Product, {
  foreignKey: 'product_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Product.hasMany(Comment, {
  foreignKey: 'product_id'
});



module.exports = {
  User,
  Product,
  Comment
};