var User = require('../models/user');

const postUsers = (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save((err) => {
        if(err) {
            console.log('Hubo error');
            console.log(err);

            res.send(err);
        }
        res.json({ message: 'User created'});
    });
};

const getUsers = (req, res) => {
    User.find((err, users) => {
        if(err) res.send(err);

        res.json(users);
    });
};

module.exports = {
    postUsers,
    getUsers
};