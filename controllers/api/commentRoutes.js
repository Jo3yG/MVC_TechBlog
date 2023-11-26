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
router.post('/', Auth, (req,res) => {
    if (req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
})
    }
});
router.put('/:id', Auth, (req,res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment with ID provided'});
            return;
        }
            req.json(dbCommentData);
    })
    .catch(err => {
         console.log(err);
         res.status(500).json(err);
    });
    });
    router.delete('/:id', Auth, (req,res) => {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment with ID provided'});
                return;
            }
                req.json(dbCommentData);
        })
        .catch(err => {
             console.log(err);
             res.status(500).json(err);
        });
        });

module.exports = router;
