var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

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

app.get('/', function(req, res) {
    var ourRecipes = recipes.get();    
    res.render('home', {'recipes' :ourRecipes});
});

app.get('/about', function(req, res) {
        res.render('about', {detail:true} );
});

app.get('/detail/:id', function(req, res) {
    var name = req.params.id;
    var ourRecipe = recipes.find(name);
    res.render('detail', {detail:true, name:ourRecipe.name, main:ourRecipe.main, time:ourRecipe.time} );
});
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
    var newRecipe = {"name":req.body.name, "main":req.body.main, "time":req.body.time};
    var result = recipes.add(newRecipe);
    if (result.added) {
        res.send("Added: " + req.body.name + "<br>New recipe = " + result.length);
    } else {
        res.send("Updated: " + req.body.name);
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = recipes.delete(req.body.name);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.name + '<br>New recipe = ' + result.length);
    } else {
        res.send(req.body.name + " not found");
    }
});

app.post('/update', function(req,res){
    res.type('text/html');
    var result = recipes.update(req.body.name, req.body.main, req.body.time, req.body.originalName);
    if (result.updated) {
        res.send("Updated: " +  req.body.name + '<br>New recipe = ' + result.length);
    } else {
        res.send(req.body.name + " not found");
    }
});







 
                     