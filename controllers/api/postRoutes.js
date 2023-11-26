const router = require('express').Router();
const Auth = require('../../utils/auth');
const {Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req,res) => {
    console.log('=========');
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'createdAt'
        ],
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'createdAt'
            ],
            inculde: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    })
})
.then(dbPostData => res.json(dbPostData.reverse()))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
