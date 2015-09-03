/*#####################
 Working with sample data 
#######################*/
/*checking internet connection before injecting the firebase module*/

angular.module('starter.services', ['firebase'])

.factory('PersonService', function ($http) {
    var BASE_URL = "http://api.randomuser.me/";
    var items = [];

    return {
        GetFeed: function () {
            return $http.get(BASE_URL + '?results=8').then(function (response) {
                items = response.data.results;
                console.log(response.data.results);
                return items;
            });
        },
        GetNewUser: function () {
            return $http.get(BASE_URL + '?results=8').then(function (response) {
                items = response.data.results;
                return items;
            });
        }
    }
})

.service('ArtistService', function ($q, $firebaseArray, $firebaseObject) {
    var FBURL = "https://blistering-inferno-7058.firebaseio.com/playlists";
    var ref = new Firebase(FBURL);
    var obj = $firebaseArray(ref);
    //console.log(obj.$id);

    /**/ obj.$loaded().then(function () {
        //console.log("loaded record:", obj.$id);

        // To iterate the key/value pairs of the object, use angular.forEach()
        angular.forEach(obj, function (value, key) {
            //console.log(key);
        });
    });

    return {
        //Retrieve all songs (playlists)
        all: function all() {
            return obj;
        },

        //Retrieve a particular song (playlist)
        oneSong: function oneSong(param) {
            //var param= '-JutVPh7yQENfY6Vm3Y6';
            var song_ref = FBURL + '/' + param;
            var song_obj = $firebaseObject(new Firebase(song_ref));

            song_obj.$loaded().then(function () {
                //console.log('loaded song object:' + song_obj);

                angular.forEach(song_obj, function (value, key) {
                    //console.log(key, value);
                })
            })
            return song_obj;
        }
    }
})

.service('SCService', function ($http) {
    // body...
    var BASE_URL = "http://api.soundcloud.com/";
    var artistTracks = [];
    return {
        GetSCUser: function (username) {

            return $http.get(BASE_URL + 'users/' + username +
              '/tracks.json?client_id=3ecb6517e53fa8882759e1c0d4fadca8')
              .then(function (response) {
                  artistTracks = response.data;
                  //console.log(artistTracks);
                  return artistTracks;
              })

        }
    }
})