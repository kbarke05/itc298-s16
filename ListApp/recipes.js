var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
        var randomRecipe =
                recipes[Math.floor(Math.random() * recipes.length)];
        res.render('home', { recipe: randomRecipe });
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

//app.use(express.static(__dirname + '/public'));



var recipes = [

{ name:'chicken fajitas', main:'chicken' },

{ name:'greek pita', main:'olives' },

{ name:'quinoa salad', main:'quinoa' }

];



    
app.post('/search', function(req,res){
 res.type('text/html');
 var search_term = req.body.recipes;
 console.log("searching for " + search_term);
 
var found = recipes.find(function(item){
     console.log(item.name);
     return item.name == search_term;
    
 });
 
 
 
 if(found){
   
   res.send ("The main ingredient of " + found.name + ' is '  + found.main);
    
   
 }else{
   
   res.send("No match found.");
   
 }

});




 
                     