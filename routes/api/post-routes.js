const router = require('express').Router();
const {
  Post,
  User, 
  Comment
} = require('../../models');
const { sequelize } = require('../../models/User');

//get all posts
router.get('/', (req, res) => {
  Post.findAll({
    //order: ['created_at'],
    attributes: [
      'id',
      'title',
      'username',
      'description',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
    ],
    include: [
      // include the Comment model here:
      {
        model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'username', 'created_at'],
            include: {
              model: Post,
              attributes: ['username']
            }
      },
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//20220511 :id to :title in head
router.get('/:title', (req, res) => {
  Post.findOne({
    where: {
      title: req.params.title
    },
    include: Comment
  })
  .then(dbPostData => {
  if (!dbPostData) {
    res.status(404).json({
      message: 'No post with this id'
    });
    return;
  }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Post.create({
      title: req.body.title,
      description: req.body.description,
      //product_category: req.body.product_category,
      user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// How do you allow only the user who generated the post 
// to make changes to the whole post 
// if user id === user_post id joining table???
router.put('/:title', (req, res) => {
  Post.update({
      title: req.body.title
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:title', (req, res) => {
  Post.destroy({
    title: req.body.title
  }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;