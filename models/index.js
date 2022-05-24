const User = require('./User');
const Category = require('./Category');
const Posts = require('./Posts');
const Comment = require('./Comment');


// // create assoc btwn user and products
User.hasMany(Posts, {
  foreignKey: 'post_user_id'
});

Posts.belongsTo(User, {
  foreignKey: 'post_user_id'
});

Posts.belongsTo(Category, {
  foreignKey: 'product_category'
});

Category.hasMany(Posts, {
  foreignKey: 'product_category'
});

// Check on associating comments with the correct post and userID simultaneously

Comment.belongsTo(User, { 
  foreignKey: 'comment_user_id'
});

Comment.belongsTo(Posts, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'comment_user_id'
});

Posts.hasMany(Comment, {
  foreignKey: 'post_id'
});




module.exports = {
  User,
  Category,
  Posts,
  Comment,
};