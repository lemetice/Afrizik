/*#####################
 Working with sample data 
#######################*/

angular.module('starter.services', [])

.factory('PersonService', function($http){
  var BASE_URL = "http://api.randomuser.me/";
  var items = [];

  return {
    GetFeed: function(){
      return $http.get(BASE_URL+'?results=8').then(function(response){
        items = response.data.results;
        console.log(response.data.results);
        return items;
      });
    },
    GetNewUser: function(){
      return $http.get(BASE_URL+'?results=8').then(function(response){
        items = response.data.results;
        return items;
      });
    }
  }
})

