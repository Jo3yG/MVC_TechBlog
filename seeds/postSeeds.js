const {Post} = require('../models');
const postData = [
    {
        title: 'The Avengers',
        content:'When the one with the power wants more powwer',
        user_id: 1,
    },
    {
        title: 'The One Ring',
        content:'When the one with the ring wants more rings',
        user_id: 2,
    },
    {
        title: 'The Avengers',
        content:'When the one with the strawberries wants more strawberries',
        user_id: 3,
    },
];
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
