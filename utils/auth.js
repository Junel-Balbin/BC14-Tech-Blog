const logAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/user/login");
  } else {
    next();
  }
};

module.exports = { logAuth };