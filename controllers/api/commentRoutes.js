// Import Express router & Comment model.
const router = require('express').Router();
const { Comment } = require('../../models');

// Route to handle creating a new comment.
router.post('/', async (req, res) => {
  try {
    // Retrieve the user ID from the session or request body.
    const userId = req.session.user_id || req.body.user_id;

    // Create a new comment using the Comment model.
    const newComment = await Comment.create({
      ...req.body,
      user_id: userId
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.