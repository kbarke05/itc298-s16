//var express = require('express');

var recipe = require("./ListApp/models/model.js");

function addRecipe(name, main, time){
    var newRecipe = new recipe({
        'name': name, 'main':main , 'time':time 
    })
    newRecipe.save(function(err) {
        if(err){
            console.log(err);
        }
//        return callback(newRecipe);
    });
    
}


addRecipe('fajitas', 'steak', 30);
//addRecipe('pita', 'olives', 15);

recipe.find(function(err, results){
    console.log(results);
});

//module.exports.addRecipe = addRecipe;