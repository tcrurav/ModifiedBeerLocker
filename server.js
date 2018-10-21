var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

mongoose.connect('mongodb://localhost:27017/beerlocker', { 
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB mongodb://localhost:27017/beerlocker');
}, err => {
    console.log(err);
});

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'low on beer!'});
});

var beersRoute = router.route('/beers');

beersRoute.post((req, res) => {
    var beer = new Beer();

    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;

    beer.save((err) => {
        if(err){
            res.send(err);
        }

        res.json({ message: 'Beer added to the locker!', data: beer});
    });
});

beersRoute.get((req, res) => {
    Beer.find((err, beers) => {
        if(err){
            res.send(err);
        }

        res.json(beers);
    });
});

var beerRoute = router.route('/beer/:beer_id');

beerRoute.get((req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if(err){
            res.send(err);
        }

        res.json(beer);
    })
});

beerRoute.put((req, res) => {
    Beer.findById(req.params.beer_id, (err, beer) => {
        if(err){
            res.send(err);
        }

        beer.quantity = req.body.quantity;

        beer.save((err) => {
            if(err) {
                res.send(err);
            }

            res.json(beer);
        });
    });
});

beerRoute.delete((req, res) => {
    Beer.findByIdAndRemove(req.params.beer_id, (err) => {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Beer removed from locker'});
    });
});

app.use('/api', router);

app.listen(port);

console.log('Server Tropical listening on http://localhost:' + port);