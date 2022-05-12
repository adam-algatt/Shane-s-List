const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');
const Comment = require('./Comment');


// // create assoc btwn user and products
User.hasMany(Post, {
  foreignKey: 'id'
});

Post.belongsTo(User, {
  foreignKey: 'id'
});

Post.belongsTo(Category, {
  foreignKey: 'id'
});

Category.hasMany(Post, {
  foreignKey: 'id'
});

// Check on associating comments with the correct post and userID simultaneously

Comment.belongsTo(Post, {
  foreignKey: 'id'
});

Post.hasMany(Comment, {
  foreignKey: 'id'
});

Comment.belongsTo(User, { 
  as: 'user_comments',
  foreignKey: 'id'
});

User.hasMany(Comment, {
  as: 'user_comments',
  foreignKey: 'id'
});

module.exports = {
  User,
  Category,
  Post,
  Comment,
};