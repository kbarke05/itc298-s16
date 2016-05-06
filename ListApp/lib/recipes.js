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


 





 


