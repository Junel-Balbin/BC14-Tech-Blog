// Import Express router & route modules.
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Use the respective routes for specific URL paths.
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Exports the router.
module.exports = router;


// Template Structure and Code Snippets from Mini Project 14.