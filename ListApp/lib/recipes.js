var recipes = [

{ name:'fajitas', main:'chicken', time: 30 },

{ name:'pita', main:'olives', time: 15 },

{ name:'quinoa', main:'quinoa', time: 25 }

];


    
exports.get = function(){
    
     return recipes;
     
}

exports.find = function(search_term){
    
//assign a variable to store the item if the find method matches the data to the array. 
return recipes.find(function(item){
     
     return item.name == search_term;
     
    
 });//end found variable assignment
 
}

exports.add = function(newRecipe){
     recipes.push(newRecipe);
     var newItem = {added:true, length: recipes.length};
     return newItem;
}

exports.delete = function(name){
     var isDeleted = false;
     for (var i= 0; i < recipes.length; i++){
         var recipe = recipes[i];
          if(recipe.name == name){
               isDeleted = true;
               recipes.splice(i, 1);
          }
     }
     var deletedItem = {deleted:isDeleted, length: recipes.length};
     return deletedItem;
}

exports.update = function(name, main, time, originalName){
     var isUpdated = false;
     for (var i= 0; i < recipes.length; i++){
         var recipe = recipes[i];
          if(recipe.name == originalName){
               isUpdated = true;
               recipe.name = name;
               recipe.main = main;
               recipe.time = time;
          }
     }
     var updatedItem = {updated:isUpdated, length: recipes.length};
     return updatedItem;
}



 





 


