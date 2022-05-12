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

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'username',
      'description',    
    ], 
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
    ]
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


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  Post.destroy({
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