//var recipes = [

//{ name:'fajitas', main:'chicken', time: 30 },

//{ name:'pita', main:'olives', time: 15 },

//{ name:'quinoa', main:'quinoa', time: 25 }

//];

//var test = require("../../test_db.js");
var Recipe = require("../models/model.js");
    
exports.get = function(callback){
    console.log("get recipes");
     Recipe.find(function(err, ourRecipes) {
         console.log(ourRecipes);
          return callback(ourRecipes);    
     });
}

exports.find = function(search_term, callback){
      test.findRecipe(search_term, function(ourRecipe) {
          return callback(ourRecipe); 
      });
}

exports.add = function(newRecipe, callback){
     test.addRecipe(newRecipe.name, newRecipe.main, newRecipe.time, function(newRecipe) {
       var newItem = {added:true, name:newRecipe.name};
       return callback(newItem);   
     })
}

exports.delete = function(name, callback){
     test.deleteRecipe(name, function(ourRecipe){
        var isDeleted = false;
        if(ourRecipe){
            isDeleted = true;
        }
        var deletedItem = {deleted:isDeleted, name:name};
        return callback(deletedItem);  
     })
}

exports.update = function(name, main, time, originalName, callback){
     test.updateRecipe(name, main, time, originalName, function(ourRecipe){
        var isUpdated = false;
        if(ourRecipe){
            isUpdated = true;
        }
        var updatedItem = {updated:isUpdated, name:name};
        return callback(updatedItem);  
     })
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

module.exports.findRecipes = findRecipes;
module.exports.findRecipe = findRecipe;
module.exports.deleteRecipe = deleteRecipe;
module.exports.updateRecipe = updateRecipe;



 





 


