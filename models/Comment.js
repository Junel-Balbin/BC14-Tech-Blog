// Import modules from Sequelize & connection.
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Comment class. Extending the Sequelize Model class.
class Comment extends Model {}

// Initialize the Comment model with attributes & options.
Comment.init(
  {
    // Define an ID field as an auto-incrementing integer primary key.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define a field to hold the comment text as a text data type.
    comment: {
      type: DataTypes.TEXT,
    },
    // Define a field to hold the creation date of the comment.
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Define a foreign key field to comments with a user.
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // Define a foreign key field to comments with a post.
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  // Provide the sequelize connection.
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

// Exports the Comment.
module.exports = Comment;


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.