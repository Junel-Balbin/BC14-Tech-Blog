const router = require("express").Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User }, { model: Comment }],
        });

        const plainPosts = posts.map(post => post.get({ plain: true }));

        res.render('home', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.