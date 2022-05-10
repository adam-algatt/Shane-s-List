const router = require('express').Router();
const {
  Post,
  User,
  Comment
} = require('../../models');
const { sequelize } = require('../../models/User');

//get all users
Post.findAll({
  order: [['created_at', 'DESC']], //make sure the order variables are available or that if not timestamps are added to the post model
  attributes: [
    'id',
    'product_category',
    'title',
    'description',
    [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE product.id = comment.product_id)'), 'comment_count']
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
      model: User,
      attributes: ['username']
    }
  ]
})

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'title', 'product_url', 'created_at']
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Product,
          attributes: ['title']
        }
      },
      {
        model: Product,
        attributes: ['title'],
        through: Comment,
        as: 'commented_products'
      }
    ]
  })
})

router.post('/', (req, res) => {
  Product.create({
    title: req.body.title,
    product_url: req.body.product_url,
    user_id: req.body.user_id
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
// router.put('/upvote', (req, res) => {
//   // custom static method created in models/Product.js
//   Product.upvote(req.body, { Vote })
//     .then(updatedPostData => res.json(updatedPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

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
  Product.destroy({
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






module.exports = router;