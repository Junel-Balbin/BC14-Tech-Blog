const router = require("express").Router();
const { logAuth } = require('../utils/auth')
const { Post } = require('../models')
router.get("/", logAuth, async (req, res) => {

  try {
    
    const posts = await Post.findAll({
         where: {
           user_id: req.session.user_id,
       },
       include: [{ model: Post}, {model: Post}],
   });

   const plainPosts = posts.map((post) => {
     return post.get({ plain: true });
   });

   const userData = await User.findOne({ where: { id: req.session.user_id } });


    console.log( {
      user:userData.get({ plain: true }),
      posts:plainPosts,

      logged_in: req.session.logged_in,
    })

    res.render("dashboard", {
      user:userData.get({ plain: true }),
      posts:plainPosts,
      logged_in: req.session.logged_in,
    });

  } catch (e) {
    console.error(e);
    res.status(500).end();
  }

  
});

module.exports = router;
