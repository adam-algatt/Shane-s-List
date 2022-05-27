const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, 
    (req, res) => {
       Posts.findAll({
              attributes: [
                    'post_id',
                    'title',
                    'description',
                    'created_at',
              ],
              include: [
                     {
                            model: User,
                            attributes: ['username']
                     }
              ]
       })
              .then(dbPostData => {
                     // serialize data before passing to the template
                     const posts = dbPostData.map(post => post.get({ plain: true }));

                     res.render('dashboard', { 
                            posts, 
                            loggedIn: true
                    });
              })
              .catch(err => {
                     console.log(err);
                     res.status(500).json(err);
              });
});

module.exports = router;