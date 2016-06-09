var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
    name: {type: String, index: true},
    main: String,
    time: Number
});

var connection_string =  'mongodb://kristie:helloWorld@ds036069.mlab.com:36069/itc298recipes';

var mongooseUri = require('mongodb-uri').formatMongoose(connection_string);

mongoose.connect(mongooseUri); 
var db = mongoose.connection;

// stuff for the db
// app.use( function(req, res, next) {
//     req.db = db;
//     next();
// });

module.exports = mongoose.model('Recipe', Recipe);