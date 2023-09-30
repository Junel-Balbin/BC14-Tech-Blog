// Import Express router & route modules.
const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const authRoutes = require("./authRoutes");
const apiRoutes = require("./api");
const postRoutes = require('./postRoutes')

// Use the respective routes for specific URL paths.
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/user", authRoutes);
router.use('/post', postRoutes);
router.use("/dashboard", dashboardRoutes);

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.