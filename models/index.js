const User = require('./User');
const Post = require('./Post');

// Create associations
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, Post };