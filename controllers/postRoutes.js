const router = require("express").Router();

const { Post, User, Comment } = require('../models');
const { logAuth } = require('../utils/auth');


router.get('/:id', logAuth, async (req, res) => {
    try {
        console.log("Request ID :: " + req.params.id)
        const posts = await Post.findAll({
            where: {
                id: req.params.id,
            },
            include: [{ all: true, nested: true }],
        });

        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });

        res.render('post', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.