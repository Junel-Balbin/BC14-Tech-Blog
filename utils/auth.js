// Middleware to check if user is logged in.
const logAuth = (req, res, next) => {
  // If not logged in, redirect to login page.
  if (!req.session.logged_in) { 
    res.redirect("/user/login");
  } else {
    // If logged in, proceed to next middleware.
    next();
  }
};

module.exports = { logAuth };


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.