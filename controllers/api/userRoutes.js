// Import Express router & User model.
const router = require('express').Router();
const { User } = require('../../models');

// Route to handle user registration.
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model.
    const userData = await User.create(req.body);

    // Save session data and respond with the user data.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user login.
router.post('/login', async (req, res) => {
  try {
    // Find the user by their username.
    const userData = await User.findOne({ where: { username: req.body.username } });

    // Check if user exists and verify password.
    if (!userData || !(await userData.checkPassword(req.body.password))) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }

    // Save session data and respond with user data.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'Logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user logout.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.