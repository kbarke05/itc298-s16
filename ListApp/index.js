var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
        res.render('home');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});


// set up handlebars view engine
var handlebars = require('express-handlebars')
        .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var recipes = require('./lib/recipes.js');


app.post('/search', function(req,res){
res.type('text/html');
var search_term = req.body.recipes;
var found = recipes.find(search_term);

 
if(found){
   
   res.send ("The main ingredient of " + found.name + ' is '  + found.main + " and it takes " + found.time + " minutes to make.");
    
   
 }else{
   
   res.send("No match found.");
   
 }   
});






 
                     