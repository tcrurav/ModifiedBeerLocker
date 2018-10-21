var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

var BeerSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    userId: String 
});

module.exports = mongoose.model('Beer', BeerSchema);