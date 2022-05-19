const router = require('express').Router();
const {
  User,
  Posts,
  Comment
} = require('../../models');


// get all users
router.get('/', (req, res) => {
  User.findAll({
      attributes: [
        'user_id',
        'username',
        'email'],
        exclude: ['password']
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:user_id', (req, res) => {
  User.findOne({
      where: {
        user_id: req.params.user_id
      },
      attributes: [
        'user_id',
        'username',
        'email',
      ],
      exclude: ['password'],
    
      include: [{
          model: Posts,
          attributes: ['post_user_id', 'title', 'product_category', 'created_at'],
        },
        // {
        //   model: Post,
        //   attributes: ['title'],
        //   //through: Comment,
        // }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id'
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({
        message: 'No user with that email address!'
      });
      return;
    }

    res.json({ user: dbUserData });

    // Verify user
    const validatePassword = db.UserData.checkPassword(req.body.password);

    if (!validatePassword) {
      res.status(400).json({
        message: 'Incorrect password!'
      });
      return;
    }

    res.json({
      user: dbUserData,
      message: 'You are now logged in!'
    });
  });
});

router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
      individualHooks: true,
      where: {
        user_id: req.params.user_id
      }
    })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({
          message: 'No user found with this id'
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:user_id', (req, res) => {
  User.destroy({
      where: {
        user_id: req.params.user_id
      }
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id'
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;