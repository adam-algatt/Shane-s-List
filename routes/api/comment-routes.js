const router = require('express').Router();
const {
    Comment
} = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
          'comment_id',
          'comment_text',
          'comment_user_id',
          'post_id'],
      })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:comment_id', (req, res) => {
    Comment.findOne({
        where: {
          comment_id: req.params.comment_id
        },
        attributes: [
          'comment_id',
          'comment_text',
          'comment_user_id',
          'post_id',
        ],
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({
            message: 'No commnet found with this id'
          });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    Comment.create({
            comment_text: req.body.comment_text,
            username: req.body.username,
            post_id: req.body.post_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
})

router.delete('/:id', (req, res) => {
  Comment.destroy({
      where: {
        id: req.params.comment_id
      }
    })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({
          message: 'No comment found with this id'
        });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;