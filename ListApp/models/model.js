var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
    name: String,
    main: String,
    time: Number
});

module.exports = mongoose.model('Recipe', Recipe);