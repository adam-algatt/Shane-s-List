const router = require('express').Router();
const { Category, Posts, User } = require('../../models');

router.get('/:category_id', (req, res) => {
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
            attributes: ['title', 'description'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ],
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({
                message: 'No category found with this id'
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