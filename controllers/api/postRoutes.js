const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../config/middleware/isAuthenticated');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // Implement update logic
});

router.delete('/:id', withAuth, async (req, res) => {
  // Implement delete logic
});

module.exports = router;
