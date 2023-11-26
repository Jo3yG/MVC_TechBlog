const router = require('express').Router();
const {Comment} = require('../../models');
const Auth = require('../../utils/auth');
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
router.get('/:id', (req,res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
.then(dbCommentData => res.json(dbCommentData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
})
});
