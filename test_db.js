var express = require('express');

var recipe = require("./ListApp/models/model.js");

function addRecipes(name, main, time){
    var newRecipe = new recipe({
        'name': name, 'main':main , 'time':time 
    })
    newRecipe.save();
}

function findRecipes() {
    recipe.find({}, function(err, recipes) {
        console.log('here');
        if (err) {
            console.log(err);
        }
        console.log(recipes);
    })
}

addRecipes('fajitas', 'chicken', 30);
addRecipes('pita', 'olives', 15);

findRecipes();

module.exports.findRecipes = findRecipes;