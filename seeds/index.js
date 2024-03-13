const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userSeedData = require('./userSeed.json');
const blogPostData = require('./blogPosts.json');

const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const hashedUsers = userSeedData.map(user => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    return { ...user, password: hashedPassword };
  });

  await User.bulkCreate(hashedUsers, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(blogPostData);

  process.exit(0);
};

seedDatabase();
