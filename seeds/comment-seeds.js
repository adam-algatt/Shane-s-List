const { Comment } = require('../models');

const commentData = [
  {
    comment_user_id: 3,
    post_id:  1,
    comment_text: 'Thor is crook.  Do not buy anything from him.'
  },
  {
    comment_user_id: 1,
    post_id:  5,
    comment_text: 'It was great doing business with Spiderman.  Great communication and I got a really good deal!'
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;