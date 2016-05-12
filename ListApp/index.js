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

app.post('/add', function(req,res){
    res.type('text/html');
    var newRecipe = {"name":req.body.recipes, "main":req.body.main, "time":req.body.time};
    var result = recipes.add(newRecipe);
    if (result.added) {
        res.send("Added: " + req.body.recipes + "<br>New recipe = " + result.length);
    } else {
        res.send("Updated: " + req.body.recipes);
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = recipes.delete(req.body.recipes);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.recipes + '<br>New recipe = ' + result.length);
    } else {
        res.send(req.body.recipes + " not found");
    }
});






 
                     