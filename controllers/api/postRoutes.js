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
router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'createdAt'
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
.then(dbPostData => {
    if (!dbPostData){
        res.status(404).json({message: 'No post with ID provided'});
        return;
    }
    res.json(dbPostData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
