const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userid = req.session.user_id?req.session.user_id:req.body.user_id

    const newComment = await Comment.create({
      ...req.body,
      user_id: userid
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.