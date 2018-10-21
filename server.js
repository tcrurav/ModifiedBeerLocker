var express = require('express');

var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var bodyParser = require('body-parser');

var beerController = require('./controllers/beer');
var userController = require('./controllers/user');

var passport = require('passport');
var authController = require('./controllers/auth');

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

app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Server listening on http://localhost:' + port);