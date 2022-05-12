const router = require('express').Router();
const {
  Post,
  User,
  Comment
} = require('../../models');
const { sequelize } = require('../../models/User');

//get all users
Post.findAll({
  order: [['created_at', 'DESC']], 
  attributes: [
    'id',
    'product_category',
    'title',
    'description',
    [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
  ],
  include: [
    // include the Comment model here:
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      // not sure if this should be here (appears to already be annotated on the above lines of code)
      model: User,
      attributes: ['username']
    }
  ]
})

// do you need to put in the model keyname for http address or can you
//just put '/:id'
router.get('/:id', (req, res) => {
  Post.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'product_category', 'created_at']
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Comment,
        as: 'user_posts'
      }
    ]
  })
})

router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    product_category: req.body.product_category,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Product.update({
    title: req.body.title
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({
          message: 'No product found with this id'
        });
        return;
      }
      res.json(dbProductData);
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
      if (!dbPosttData) {
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