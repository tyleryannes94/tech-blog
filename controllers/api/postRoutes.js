const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../config/middleware/isAuthenticated');

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
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found or user not authorized' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (deletedRows > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found or user not authorized' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
