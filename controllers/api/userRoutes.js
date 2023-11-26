


router.post('/login', (req, res) => {
    User.findOne({
       where: {
        username: req.body.username
       } 
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'No User'});
            return;
        }
        const validPSW = dbUserData.checkPassword(req.body.password);
        if (!validPSW) {
            res.status(400).json({message: 'Wrong Password'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'YAY Logged In!!'});
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
router.put('/:id', (req, res) => {
    User.update(req.body,{
        individualHooks: true,
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({message: 'No User with ID provided'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
router.delete('/id:', (req, res) => {
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message:'No User with ID provided'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;
