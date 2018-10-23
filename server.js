var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var clientController = require('./controllers/client');

var passport = require('passport');
var authController = require('./controllers/auth');

var ejs = require('ejs');

mongoose.connect('mongodb://localhost:27017/beerlocker', { 
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB mongodb://localhost:27017/beerlocker');
}, err => {
    console.log(err);
});

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

app.set('view-engine', 'ejs');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'low on beer!'});
});

router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beer/:beer_id')
    .put(authController.isAuthenticated, beerController.putBeer)
    .get(authController.isAuthenticated, beerController.getBeerById)
    .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on http://localhost:' + port);