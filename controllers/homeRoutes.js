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
