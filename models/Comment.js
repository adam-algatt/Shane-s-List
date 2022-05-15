const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    comment_id: {
       type: DataTypes.INTEGER, 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 500]
        }
    },
    comment_user_id: {
       type: DataTypes.INTEGER,
       allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
          }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'post_id'
        }
    }
}, 
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

module.exports = Comment;