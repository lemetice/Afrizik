/*#####################
 Working with sample data 
#######################*/

angular.module('starter.services', ['firebase'])

/*
.factory('PersonService', function($http){
  var BASE_URL = "http://api.randomuser.me/";
  var items = [];

  return {
    GetFeed: function(){
      return $http.get(BASE_URL+'?results=4').then(function(response){
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
*/

.factory("PersonService", function($http, $firebaseObject){
  var items = [];
  var fbref = new Firebase("https://afrizik.firebaseio.com/");

  return {
    GetFeed: function(){
          var sync =  $firebaseObject(fbref.child("user/"));
          return items = sync ;
    }
  }
  console.log(sync.user);
  /*var syncObject = sync.$asObject();
    //  sync.$bindTo($scope, "items");
    $scope.items = items.add();
    return items ;
    */
})



