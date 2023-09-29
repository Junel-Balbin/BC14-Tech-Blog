const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id || req.body.user_id;

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

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.