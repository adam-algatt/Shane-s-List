const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');
const Comment = require('./Comment');


// // create assoc btwn user and products
User.hasMany(Post, {
  foreignKey: 'post_user_id'
});

Post.belongsTo(User, {
  foreignKey: 'post_user_id'
});

Post.belongsTo(Category, {
  foreignKey: 'product_category'
});

Category.hasMany(Post, {
  foreignKey: 'product_category'
});

// Check on associating comments with the correct post and userID simultaneously

Comment.belongsTo(User, { 
  foreignKey: 'comment_user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'comment_user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});




module.exports = {
  User,
  Category,
  Post,
  Comment,
};