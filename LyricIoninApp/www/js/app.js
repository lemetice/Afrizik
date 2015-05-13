// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var db=null;
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'starter.services', 'ngSanitize'])


.run(function($ionicPlatform, $rootScope, $cordovaNetwork, $ionicPopup, $ionicLoading, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      //open database
      window.plugins.sqlDB.copy("lyric.db", function() {
            db = $cordovaSQLite.openDB("lyric.db");
        }, function(error) {
            console.error("There was an error copying the database: " + error);
            db = $cordovaSQLite.openDB("lyric.db");
        });
    //Check networkstatus (Internet connection)
   if(window.Connection) { 
      if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
              title: "Internet Disconnected",
              content: "The internet is disconnected on your device."
          })
          .then(function(result) {
              if(!result) {
                  ionic.Platform.exitApp();
              }
              else{
                $ionicPopup.alert({
                 title: 'Works offline too!',
                 template: 'Pull to refresh.Enjoy'
               });
              }
          });
      }
      }
      //Adding Google Admod for advertisement.
      if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? "ANDROID_PUBLISHER_KEY" : "IOS_PUBLISHER_KEY";
                var admob = window.plugins.AdMob;
                admob.createBannerView( 
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    }, 
                    function() {
                        admob.requestAd(
                            { 'isTesting': false }, 
                            function() {
                                admob.showAd(true);
                            }, 
                            function() { console.log('failed to request ad'); }
                        );
                    }, 
                    function() { console.log('failed to create banner view'); }
                );
            }
  });
  
/*
  $rootScope.$on('loading:show', function() {
  $ionicLoading.show({template: 'foo...'})
  })

  $rootScope.$on('loading:hide', function() {
  $ionicLoading.hide()
 })
*/
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  //Loading interceptor for all http requests
  /* $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  }) */

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  
  .state('app.search', {
    url: "/search/:searchId",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })

  .state('app.songdetail', {
    url: "/songdetail/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/songdetail.html",
        controller: 'slideBoxCtrl'
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
 /* .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
*/
  .state('app.songsincategory', {
    url: "/playlists/:categoryId",
    views: {
      'menuContent': {
        templateUrl: "templates/songsincategory.html",
        controller: 'SongsCtrl'
      }
    }
  })

  /*navigation to soundcloud*/
    .state('app.soundcloud',{
      url: "/soundcloud",
      views: {
        'menuContent' : {
          templateUrl: "templates/soundcloud.html",
          controller: 'SoundCloudCtrl'
        }
      }
    })
    

  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"        
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});