const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const { logAuth } = require('../utils/auth');

router.get('/', logAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                user_id: req.session.user_id,
              }
        });

        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });

        res.render('dashboard', {
            post: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.get('/create', logAuth, (req, res) => {
    res.render("addpost",{logged_in: req.session.logged_in});
});

router.get('/update/:id', logAuth, async (req, res) => {
    try {
        console.log("Request ID :: " + req.params.id)
        const post = await Post.findOne({
            where: {
                id: req.params.id,
            },
            include: [{ model: User},{ model: Comment }],
        });

        console.log(post.dataValues)

        res.render("updatepost" , { 
            post:post.dataValues , 
            logged_in: req.session.logged_in,});

    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
    

module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.