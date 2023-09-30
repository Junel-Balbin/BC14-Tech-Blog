// Import models User, Post & Comment.
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between models using Sequelize's association methods.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany((Comment), {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany((Comment), {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(User,{
  foreignKey: 'user_id'
})

// Export the User, Post & Comment.
module.exports = { User, Post, Comment};


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.