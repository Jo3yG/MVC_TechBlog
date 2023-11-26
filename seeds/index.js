const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    await seedPosts();
    await seedComments();
    await seedUsers();
    process.exit(0);
};
seedAll();
