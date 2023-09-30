// Import modules from Sequelize & connection.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post class. Extends the Sequelize Model.
class Post extends Model {}

// Initialize the Post model with its attributes & options.
Post.init(
  {
    // Define an ID field as an auto-incrementing integer primary key.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a field to hold the post title as a string.
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define a field to hold the post content as text.
    content: {
      type: DataTypes.TEXT,
    },
    // Define a field to hold the creation date of the post.
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define a field to hold the modification date of the post.
    date_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define a foreign key field to posts with a user
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      // Define a hook to update the modification date before an update.
      beforeUpdate: async (updatedPost) => {
        updatedPost.date_modified = DataTypes.NOW;
        return updatedPost;
      },
    },
    // Provide the sequelize connection.
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Exports the Post.
module.exports = Post;


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.