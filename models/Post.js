const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,  // Used TEXT for potentially longer post content
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,  // Ensures a post is always associated with a user
    },
  },
  {
    sequelize,
    timestamps: true,  // Enables timestamps for createdAt and updatedAt
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;