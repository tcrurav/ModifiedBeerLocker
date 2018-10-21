var Beer = require('../models/beer');

const postBeers = (req, res) => {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;

    beer.save((err) => {
        if(err) res.send(err);

        res.json({ message: 'Beer added to the locker!', data: beer});
    });
};

const getBeers = (req, res) => {
    Beer.find({userId: req.user._id}, (err, beers) => {
        if(err) res.send(err);

        res.json(beers);
    });
};

const getBeerById = (req, res) => {
    Beer.findById({ userId: req.user._id, _id: req.params.beer_id}, (err, beer) => {
        if(err) res.send(err);

        res.json(beer);
    })
};

const putBeer = (req, res) => {
    Beer.findById({ userId: req.user._id, _id: req.params.beer_id }, (err, beer) => {
        if(err) res.send(err);

        beer.quantity = req.body.quantity;

        beer.save((err) => {
            if(err) res.send(err);

            res.json(beer);
        });
    });
};

const deleteBeer = (req, res) => {
    Beer.findByIdAndRemove({ userId: req.user._id, _id: req.params.beer_id }, (err) => {
        if(err) res.send(err);

        res.json({ message: 'Beer removed from locker'});
    });
};

module.exports = {
    getBeers,
    getBeerById,
    postBeers,
    putBeer,
    deleteBeer
}

