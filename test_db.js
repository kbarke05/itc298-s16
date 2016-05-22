var express = require('express');

var recipe = require("./ListApp/models/model.js");

function addRecipe(name, main, time, callback){
    var newRecipe = new recipe({
        'name': name, 'main':main , 'time':time 
    })
    newRecipe.save(function(err) {
        if(err){
            console.log(err);
        }
        return callback(newRecipe);
    });
    
}

function findRecipes(callback) {
    recipe.find({}, function(err, recipes) {
        if (err) {
            console.log(err);
        }
        return callback(recipes);
    })
}

function findRecipe(name, callback) {
    recipe.findOne({name:name}, function(err, ourRecipe) {
        if (err) {
            console.log(err);
        }
        return callback(ourRecipe);
    })
}

function deleteRecipe(name, callback) {
    recipe.findOneAndRemove({name:name}, function(err, ourRecipe) {
        if (err) {
            console.log(err);
        }
        return callback(ourRecipe);
    })
}

function updateRecipe(name, main, time, originalName, callback) {
    recipe.findOneAndUpdate({name:originalName}, {name:name, main:main, time:time}, function(err, ourRecipe) {
        if (err) {
            console.log(err);
        }
        return callback(ourRecipe);
    })
}

//addRecipe('fajitas', 'chicken', 30);
//addRecipe('pita', 'olives', 15);

//findRecipes();

module.exports.findRecipes = findRecipes;
module.exports.addRecipe = addRecipe;
module.exports.findRecipe = findRecipe;
module.exports.deleteRecipe = deleteRecipe;
module.exports.updateRecipe = updateRecipe;