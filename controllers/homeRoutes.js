const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
router.get('/', Auth, (req, res) => {
    Post.findAll({
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
        res.render('dashboard', {posts, loggenIn: req.session.loggedIn});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});
router.get('/signup',(req, res) => {
    res.render('signup');
});
router.get('/post/:id',(req, res) => {
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
        if (!dbPostData) {
            res.status(404).json({message: 'No post with ID provided'});
        return;
        }
    const post = dbPostData.get({plain: true});
    console.log(post);
    res.render('single-post', {post, loggenIn: req.session.loggedIn});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.get('/post-comments', (req, res) => {
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
            {
                model: User,
                attributes: ['username'], 
            }
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with ID provided'});
        return;
        }
    const post = dbPostData.get({plain: true});
    res.render('post-comments', {post, loggenIn: req.session.loggedIn});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;
