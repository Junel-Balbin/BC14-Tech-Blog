// Import Express router module.
const router = require("express").Router();

// Route to render the signup page.
router.get("/signup", (req, res) => {
  res.render("signup", { logged_in: false });
});
// Route to render the login page.
router.get("/login", (req, res) => {
  res.render("login", { logged_in: false });
});
// Route to handle user logout.
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render("logout", { logged_in: false });
    });
  } else {
    res.render("logout", { logged_in: false });
  }
});

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.