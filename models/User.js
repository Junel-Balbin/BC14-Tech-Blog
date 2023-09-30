// Import modules from Sequelize, bcrypt & connection.
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User class. Extending the Sequelize Model.
class User extends Model {
  // Method to check if the provided password matches the hashed password.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes & options.
User.init(
  {
    id: {
      // Define an ID field as an auto-incrementing integer primary key.
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // Define a field to hold the user's name as a string.
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define a field to hold the user's email as a string.
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // Define a field to hold the user's username as a string.
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Define a field to hold the user's password as a string with length validation.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7],
      },
    },
  },
  {
    hooks: {
      // Hash the password before creating a new user.
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Hash the password before updating an existing user.
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Provide the sequelize connection.
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Exports the User.
module.exports = User;


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.