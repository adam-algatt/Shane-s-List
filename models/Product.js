const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {
// adds a static method that can be called using Post.upvote()
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Product.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'product_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE product.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}

//Post fields
Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  post_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isURL: true
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
});

module.exports = Post;