// Import Express router module and required models.
const router = require("express").Router();
const { Post, User, Comment } = require('../models');

// Route to render the home page.
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts. Including user & comments.
        const posts = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        // Convert posts to plain objects for rendering.
        const plainPosts = posts.map(post => post.get({ plain: true }));

        // Render the home page with retrieved posts & login status.
        res.render('home', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.