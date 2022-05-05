const router = require('express').Router();
const {
    Comment
} = require('../../models');

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            product_id: req.body.product_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

router.delete('/:id', (req, res) => {

});

module.exports = router;