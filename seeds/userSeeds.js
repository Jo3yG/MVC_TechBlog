const {User} = require('../models');
const userData = [
    {
        username:'Jerry',
        password:'Jerry',
    },
    {
        username:'Kramer',
        password:'Kramer',
    },
    {
        username:'George',
        password:'George',
    },
];
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
