module.exports = function(app) {
    var recipes = require("../lib/recipes");

    // UI routes
    
app.get('/', function(req, res) {
        res.render('master.html');
    
});

app.get('/about', function(req, res) {
        res.render('about', {detail:true} );
});

app.get('/detail/:id', function(req, res) {
    var name = req.params.id;
    recipes.find(name, function(ourRecipe){
        
    res.render('detail', {detail:true, name:ourRecipe.name, main:ourRecipe.main, time:ourRecipe.time} );    
        
    });
});

app.post('/search', function(req,res){
    res.type('text/html');
    var search_term = req.body.name;
    recipes.find(search_term, function(ourRecipe) {
      
      if(ourRecipe){
       res.send ("The main ingredient of " + ourRecipe.name + ' is '  + ourRecipe.main + " and it takes " + ourRecipe.time + " minutes to make.");
     }else{
       res.send("No match found.");
     } 
    });
});



app.post('/add', function(req,res){
    res.type('text/html');
    var newRecipe = {"name":req.body.name, "main":req.body.main, "time":req.body.time};
    recipes.add(newRecipe, function(newRecipe){
       if (newRecipe.added) {
            res.send("Added: " + req.body.name + "<br>New recipe = " + newRecipe.name);
        } else {
            res.send("Updated: " + req.body.name);
        } 
    });
    
});

app.post('/delete', function(req,res){
    res.type('text/html');
    recipes.delete(req.body.name, function(result){
       if (result.deleted) {
        res.send("Deleted: " +  req.body.name + '<br>New recipe = ' + result.name);
    } else {
        res.send(req.body.name + " not found");
    } 
    });
    
});

app.post('/update', function(req,res){
    res.type('text/html');
    recipes.update(req.body.name, req.body.main, req.body.time, req.body.originalName, function(result){
        if (result.updated) {
            res.send("Updated: " +  req.body.name + '<br>New recipe = ' + result.name);
        } else {
            res.send(req.body.name + " not found");
        } 
    });
   
});
    
    // API routes
    app.get('/api/recipes', function(req,res) {
        var ourRecipes = recipes.get(function(ourRecipes) {
            if (ourRecipes) {
                res.json(ourRecipes);    
            } else {
                res.status(404).send("404 - no recipes found");    
            }
        });  
    });

    app.get('/api/detail/:name', function(req,res) {
        var found = recipes.find(req.params.name);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - no recipe found");    
        }
    });

    app.post('/api/search', function(req,res){
        var search_term = req.body.name;
        recipes.find(search_term, function(ourRecipe) {
          
          if(ourRecipe){
           res.json({message: "The main ingredient of " + ourRecipe.name + ' is '  + ourRecipe.main + " and it takes " + ourRecipe.time + " minutes to make."});
         }else{
           res.json({message: "No match found."});
         } 
        });
    });
    
    app.post('/api/add', function(req,res){
        var newRecipe = {"name":req.body.name, "main":req.body.main, "time":req.body.time};
        recipes.add(newRecipe, function(newRecipe) {
          
          if (newRecipe.added) {
                res.send({message:"Added: " + req.body.name + ". New recipe = " + newRecipe.name});
          } else {
                res.send({message:"Updated: " + req.body.name});
          } 
        });
    });
    
    app.post('/api/delete', function(req,res){
        recipes.delete(req.body.name, function(result){
           if (result.deleted) {
            res.send({message: "Deleted: " +  req.body.name });
        } else {
            res.send({message: req.body.name + " not found"});
        } 
        });
    });
    
     app.post('/api/update', function(req,res){
         console.log(req.body.name);
         // your update function should take a single recipe object, 
         // so you can add or change properties without have to change list of parameters
        recipes.update(req.body.name, req.body.main, req.body.time, req.body.originalName, function(result){
            console.log(result);
            if (result.updated) {
                res.send({message: "Updated: " +  req.body.name + '. New recipe = ' + result.name});
            } else {
                res.send({message: req.body.name + " not found"});
            } 
        });
    });
    
}