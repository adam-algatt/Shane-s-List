const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
  foreignKey: 'title'
});
Post.belongsTo(User);

Category.hasMany(Post, {
  foreignKey: 'title'
});
Post.belongsTo(Category);

Post.hasMany(Comment, {
  foreignKey: 'username'
});
Comment.belongsTo(Post);


User.hasMany(Comment, {
  as: 'user_comments',
  foreignKey: 'username'
});
Comment.belongsTo(User);



module.exports = {
  User,
  Category,
  Post,
  Comment,
};