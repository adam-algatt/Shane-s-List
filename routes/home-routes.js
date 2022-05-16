const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Category, User, Comment, //Vote 
} = require('../models');

router.get('/', (req, res) => {
    console.log('==================================');
    Post.findAll({
        attributes: [
            'post_id',
            'title',
            'description',
            'product_category'
           // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Category,
                attributes: ['category_name']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { 
                posts, 
            //    loggedIn: req.session.loggedIn 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
});

router.get('/post/:post_id', (req, res) => {
    Post.findOne({
        where: {
            post_id: req.params.post_id
        },
        attributes: [
            'post_id',
            'title',
            'description',
            'product_category'
            //[sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_id', 'comment_text', 'comment_user_id'],
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
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this is' });
                return;
            }

            // serialize data 
            const post = dbPostData.get({ plain: true });
            
            // pass data to template
            res.render('single-post', { 
                post,
            //    loggedIn: req.session.loggedIn 
            });
        })    
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;