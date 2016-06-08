var express = require('express');

var app = express();

var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});

var connection_string =  'mongodb://kristie:helloWorld@ds036069.mlab.com:36069/itc298recipes';

var mongooseUri = require('mongodb-uri').formatMongoose(connection_string);

mongoose.connect(mongooseUri); 
var db = mongoose.connection;

// stuff for the db
app.use( function(req, res, next) {
    req.db = db;
    next();
});


// set up handlebars view engine
var handlebars = require('express-handlebars')
        .create({ defaultLayout:'main' });
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var recipes = require('./lib/recipes.js');

var routes = require('./lib/routes.js')(app);

var test_db = require("../test_db.js");







 
                     