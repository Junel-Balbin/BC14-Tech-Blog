// Import Express router.
const router = require("express").Router();

// Import models & authentication middleware.
const { Post, User, Comment } = require('../models');
const { logAuth } = require('../utils/auth');

// Route to render a specific post by its ID.
router.get('/:id', logAuth, async (req, res) => {
    try {
        console.log("Request ID :: " + req.params.id)
        // Retrieve the post with the specified ID. Including user & comments.
        const posts = await Post.findAll({
            where: {
                id: req.params.id,
            },
            include: [{ all: true, nested: true }],
        });

        // Convert posts to plain objects for rendering.
        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });
        // Render the post page with retrieved post & login status.
        res.render('post', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(error);
        res.status(500).end();
    }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.