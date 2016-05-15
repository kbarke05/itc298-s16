module.exports = function(app) {
    var recipes = require("../lib/recipes");

    // UI routes
    
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
    
    // API routes
    app.get('/api/recipes', function(req,res) {
        var recipes = recipes.get();
        if (recipes) {
            res.json(recipes);    
        } else {
            res.status(404).send("404 - no recipes found");    
        }
    });

    app.get('/api/detail/:name', function(req,res) {
        var found = recipes.find(req.params.name);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - no recipe found");    
        }
    });
    
}