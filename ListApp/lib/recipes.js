//var recipes = [

//{ name:'fajitas', main:'chicken', time: 30 },

//{ name:'pita', main:'olives', time: 15 },

//{ name:'quinoa', main:'quinoa', time: 25 }

//];

var test = require("../../test_db.js");
    
exports.get = function(callback){
     test.findRecipes(function(ourRecipes) {
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



 





 


