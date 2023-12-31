// Import Express router & models Post, Comment & User.
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// Route to get all posts with User & comments.
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User },
        { model: Comment }
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to create a new post.
router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.status(401).json('Cannot Post!');
    }

    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to update a post.
router.put('/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.status(401).json('Cannot Update Post!');
    }

    const updatedPost = await Post.update(
      { ...req.body, user_id: req.session.user_id },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        }
      }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Route to get all posts by a specific user.
router.get('/user', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.status(401).json('Get Unsuccessful!');
    }

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: Comment }],
    });

    if (!postData) {
      return res.status(404).json({ message: `No post found by User ${req.session.user_id}.` });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a specific post by its ID.
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [{ all: true, nested: true }],
    });

    if (!postData) {
      return res.status(404).json({ message: 'No post found by ID.' });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a specific post by its ID.
router.delete('/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res.status(401).json('Cannot delete.');
    }

    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      return res.status(404).json({ message: 'No Post found by ID.' });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.