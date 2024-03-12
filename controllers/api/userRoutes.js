const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// POST route for user registration
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
});

// POST route for user logout
router.post('/logout', (req, res) => {
});

module.exports = router;
