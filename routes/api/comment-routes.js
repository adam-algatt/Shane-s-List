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
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
})

// delete a post from user making sure it's only posts from user making 
//request and that only the correct post is deleted
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            c
        }

    })
        .then()
});

module.exports = router;