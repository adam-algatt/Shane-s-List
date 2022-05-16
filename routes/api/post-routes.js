const router = require('express').Router();
const {
  Post,
  User, 
  Comment,
  Category
} = require('../../models');
const { sequelize } = require('../../models/User');

//get all posts
router.get('/', (req, res) => {
  Post.findAll({
    //order: ['created_at'],
    attributes: [
      'post_id',
      'title',
      'post_user_id',
      'description',
      'product_category',
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.post_id = comment.post_id)'), 'comment_count']
    ],
    include: [
        // // include the Comment model here:
        {
          model: Comment,
          attributes: ['comment_id', 'comment_user_id', 'comment_text', 'created_at'],
            // include User model here for comment username
            include: {
              model: User,
              attributes: ['username'],
            }
        },
        {
        model: User,
        attributes: ['username'],
        },
        {
          model: Category,
          attributes: ['category_name']
        }
    ],         
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:post_id', (req, res) => {
  Post.findOne({
    where: {
      post_id: req.params.post_id
    },
    attributes: [
      'post_id',
      'title',
      'post_user_id',
      'description',    
    ], 
    include: [
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['comment_id', 'comment_user_id', 'comment_text', 'created_at'],
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
      product_category: req.body.product_category,
      user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:post_id', (req, res) => {
  Post.update({
      title: req.body.title
    }, {
      where: {
        id: req.params.post_id
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

router.delete('/:post_id', (req, res) => {
  Post.destroy({
      where: {
        id: req.params.post_id
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