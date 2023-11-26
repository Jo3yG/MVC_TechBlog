const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const Auth = require('../utils/auth');
router.get('/', Auth, (req, res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id,
        },
        attributes: [
            'id',
            'title',
            'content',
            'createdAt'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'createdAt'
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true}));
        res.render('dashboard', {posts, loggenIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/edit/:id', Auth, (req, res) => {
    Post.findOne({
        where:{
            id: req.params.id,
        },
        attributes: [
            'id',
            'title',
            'content',
            'createdAt'
        ],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'pos_id',
                    'user_id',
                    'createdAt'
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with ID provided'});
        return;
        }
    const post = dbPostData.get({plain: true});
    res.render('edit-post', {post, loggenIn: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/new', (req, res) => {
    res.render('new-post');
});
module.exports = router;
