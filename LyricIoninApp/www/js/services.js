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

.service('ArtistService', function( $q, $firebaseObject){
    var FBURL= "https://blistering-inferno-7058.firebaseio.com/playlists";
    var ref= new Firebase(FBURL);
    var obj = $firebaseObject(ref);
    //console.log(obj.$id);

   /**/ obj.$loaded().then(function(){
        console.log("loaded record:", obj.$id);

         // To iterate the key/value pairs of the object, use angular.forEach()
         angular.forEach(obj, function(value, key) {
           // console.log(key, value);
         });
    });
   
  return {
    all: function all(){
      return obj;
    },

    oneSong: function oneSong(){
        var param= '-JutVPh7yQENfY6Vm3Y6';
        var song_ref = FBURL + '/' + param;
        var song_obj = $firebaseObject(new Firebase(song_ref));

        song_obj.$loaded().then(function(){
          //console.log('loaded song object:' + song_obj);

        angular.forEach(song_obj, function(value, key){
          //console.log(key, value);
        })
        })
        return song_obj;
    }
  }
})

