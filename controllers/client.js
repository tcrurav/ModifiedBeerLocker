var Client = require('../models/client');

const postClients = (req, res) => {

    var client = new Client();

    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;
    
    client.save((err) => {
        if(err) res.send(err);

        res.json({ message: 'Client added to the locker', data: client});
    });
};

const getClients = (req, res) => {
    Client.find({ userId: req.user._id }, (err, clients) => {
        if(err) res.send(err);

        res.json(clients);
    });
};

module.exports = {
    postClients,
    getClients
};