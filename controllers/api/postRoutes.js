const router = require('express').Router();
const { Post, Comment, User } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ 
      include: [{ model: User },{ model: Comment }],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json('Cannot Post.');
      return
    }
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json('Cannot Update Post.');
      return
    }
    const updatedPost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    }, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});


router.get('/user', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.status(401).json('Get Unsuccessful.');
      return
    }

    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model:Comment }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found by User.'  + req.session.user_id});
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ all: true, nested: true }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found by ID.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.status(401).json('Cannot delete.');
      return
    }

    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Post found by ID.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.