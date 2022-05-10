const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');

// // create assoc btwn user and products
User.hasMany(Post, {
  through: user_posts,
  as: 'posts',
  foreignKey: 'post_id'
});

Post.belongsTo(User, {
  through: user_posts,
  as: 'posts',
  foreignKey: 'post_id'
});

//check on associating comments with the correct post and userID simultaneously

Comment.belongsTo(User, {
  through: user_comments,
  as: 'comments',
  foreignKey: 'comment_id'
});

User.hasMany(Comment, {
  through: user_comments,
  as: 'comments',
  foreignKey: 'comment_id'
});



// Comment.belongsTo(Product, {
//   foreignKey: 'product_id'
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id'
// });

// Product.hasMany(Comment, {
//   foreignKey: 'product_id'
// });




module.exports = {
  User,
  Post,
  Comment,
  Category
};