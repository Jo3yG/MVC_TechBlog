const {Comment} = require('../models');
const commentData = [{
    comment_text: 'Lorem Ipsum dolor sit amet',
    user_id: 1,
    post_id: 1
},
{
    comment_text: 'Lorem Ipsum dolor sit amet',
    user_id: 2,
    post_id: 2
},
{
    comment_text: 'We are Family, All my brother sister and me',
    user_id: 3,
    post_id: 3  
}
];
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
