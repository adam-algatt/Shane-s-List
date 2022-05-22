const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model { }

//Post fields
Posts.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    product_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id'
       }
    }
  }, 
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts'
});

module.exports = Posts;