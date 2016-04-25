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

app.get('/search', function(req, res){
        var randomRecipe =
                recipes[Math.floor(Math.random() * recipes.length)];
        res.render('search', { recipe: randomRecipe });
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



var recipes =
        ["Chicken fajitas",
        "Quinoa salad",
        "Salmon with pesto pasta",
        "Greek pita"];



app.post('/search', function(req, res){
  
//var input = document.querySelectorAll('[name=recipes]');

var recipe = {title:"Chicken fajitas", mainIngredient:"chicken"};  

 
 if(recipes.value==recipe.title){
   
   res.send ("The main ingredient of your recipe is ");
    return true;
   
 }else{
   
   res.send("No match found.");
    return false;
 }
 
                       
            
});