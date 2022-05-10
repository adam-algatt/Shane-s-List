const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');

// // create assoc btwn user and Posts
User.hasMany(Post, {
  as: 'user_posts',
  foreignKey: 'post_id'
});

Post.belongsTo(User, {
  as: 'user_posts',
  foreignKey: 'post_id'
});

Post.hasOne(Category, {
  foreignKey: 'category_id'
})

Category.hasMany(Post, {
  foreignKey: 'post_id'
})
//check on associating comments with the correct post and userID simultaneously

Comment.belongsTo(User, {
  as: 'user_comments',
  foreignKey: 'comment_id'
});

User.hasMany(Comment, {
  as: 'user_comments',
  foreignKey: 'comment_id'
});

module.exports = {
  User,
  Post,
  Comment,
  Category
};