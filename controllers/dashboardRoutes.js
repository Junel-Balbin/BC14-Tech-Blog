// Import Express router module and required models.
const router = require("express").Router();
const { Post, User, Comment } = require('../models');
// Import authentication middleware.
const { logAuth } = require('../utils/auth');

// Route to render the user's dashboard.
router.get('/', logAuth, async (req, res) => {
    try {
        // Retrieve all posts associated with the logged-in user.
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            }
        });

        // Convert posts to plain objects for rendering.
        const plainPosts = posts.map(post => post.get({ plain: true }));

        // Render the dashboard page with retrieved posts and login status.
        res.render('dashboard', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

// Route to render the create post page.
router.get('/create', logAuth, (req, res) => {
    res.render("addpost", { logged_in: req.session.logged_in });
});

// Route to render the update post page.
router.get('/update/:id', logAuth, async (req, res) => {
    try {
        // Find the post with the specified ID. Including user & comments.
        const post = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [{ model: User }, { model: Comment }],
        });
        // Render the update post page with retrieved post & login status.
        res.render("updatepost", {
            post: post.dataValues,
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