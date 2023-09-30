// Import Sequelize connection & Sequelize models User, Comment & Post.
const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

// Importing data files containing user, comment & post data.
const userData = require('./userData.json');
const commentData = require('./commentData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  // Sync the Sequelize models with the database and drop existing tables.
  await sequelize.sync({ force: true });

  // Create users and return an array of user objects.
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create posts and associate with random users.
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Create comments & associate with random users or set user_id to null for a specific comment.
  for (const comment of commentData) {
    let userid = users[Math.floor(Math.random() * users.length)].id
    // If it's a specific comment set user_id to null (commentData[2]).
    if (commentData[2] === comment)
      userid = null
    await Comment.create({
      ...comment,
      user_id: userid,
    });
  }
  
  // Exit after seeding the database.
  process.exit(0);
};

// Call the seedDatabase.
seedDatabase();


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.