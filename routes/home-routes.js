const router = require('express').Router();
const sequelize = require('../config/connection');
const { Posts, Category, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log('==================================');
    Posts.findAll({
        attributes: [
            'post_id',
            'title',
            'description',
            'product_category'
        ],
        include: [
            {
                model: Category,
                attributes: ['category_name']
            },
            {
                model: User,
                attributes: ['username', 'email']
            },
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { 
                posts, //loggedIn: req.session.loggedIn 
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

router.get('/register', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('register');
});

router.get('/posts/:post_id', (req, res) => {
    Posts.findOne({
        where: {
            post_id: req.params.post_id
        },
        attributes: [
            'post_id',
            'title',
            'description',
            'product_category'
        ],
        include: [
            {
                model: Comment,
                attributes: ['comment_id', 'comment_text', 'comment_user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username', 'email']
            },
            {
                model: Category,
                attributes: ['category_name']
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
            res.render('single-post', { post, //loggedIn: req.session.loggedIn 
            });
        })    
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});


router.get('/categories/:category_id', (req, res) => {
    Category.findOne({
        where: {
            category_id: req.params.category_id
        },
        attributes: [
            'category_id',
            'category_name'
        ],
        include: [
            {
                model: Posts,
                attributes: ['product_category', 'title', 'description'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'This category does not exist' });
                return;
            }
            // serialize data 
            const category = dbCategoryData.get({ plain: true });
            //console.log(dbCategoryData)
      
            // pass data to template
            res.render('category', { category }
            //loggedIn: req.session.loggedIn 
            );
        })    
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;