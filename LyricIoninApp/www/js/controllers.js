/*########################################################
Author: Arnold Chuenffo
Description:     Database and controllers
##########################################################*/


var search_key=null;


angular.module('starter.controllers', ['ngSanitize'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close ita
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('PlaylistsCtrl', function($scope, $timeout, $ionicLoading,  PersonService) {
  $scope.playlists=[];
//Loading data
 //$ionicLoading.show();
 
  PersonService.GetFeed().then(function(items){
    $scope.playlists = items;
  });

  $scope.doRefresh = function() {
  PersonService.GetNewUser().then(function(items){
    $scope.playlists = items.concat($scope.items);
    //Stop the ion-refresher from spinning
    $scope.$broadcast('scroll.refreshComplete');
  });
};
 

})

.controller('PlaylistCtrl', function($scope, $stateParams, $http,$state, $ionicLoading) {
        $scope.goPlay= function(){
          $state.go('app.single');
        }

})
/**/
.controller('SoundCloudCtrl', function($scope, $state){

  $scope.soundCloudLogin = function(){
  // initialize client with app credentials
      SC.initialize({
        client_id: '3ecb6517e53fa8882759e1c0d4fadca8',
        redirect_uri: 'http://www.soundcloud.com'
      });

      // initiate auth popup
      SC.connect(function() {
        //$state.go('app.playlists');
        SC.get('/me', function(me) { 
          alert('Hello, ' + me.username); 
        });
      });
    }
})


.controller("categoriesCtrl", function($scope, $stateParams){
  $scope.categories = [
    { title: 'HipHop',  id: 1 },
    { title: 'Makossa',     id: 2 },
    { title: 'Bikutsi',     id: 3 },
    { title: 'Benskin',     id: 4 },
    { title: 'Reggae',      id: 5 },
    { title: 'Rap',         id: 6 },
    { title: 'Gospel',     id: 7 },
    { title: 'Folklore',    id: 8 }
  ];
})

.controller("categoryCtrl", function($scope, $stateParams){

})

.controller('slideBoxCtrl', function($scope, $ionicModal){

})

.controller('SongsCtrl', function($scope, $cordovaSQLite, $stateParams, $ionicLoading){

  //var db= $cordovaSQLite.openDB({name: "lyric.db"});
  $scope.results=[];
  $ionicLoading.show();
  var query=
            " SELECT s.*, a.*, l.*,c.* FROM 'song' s " + 
            " INNER JOIN 'category' c ON \
              (s.id_category = c.id_category AND \
              c.name=" + "'" + angular.lowercase($stateParams.categoryId) + "'" + ")" + 
            " INNER JOIN 'song_artist' sa ON (sa.'id_song' = s.'id_song' AND sa.'is_main_artist' = 1)" + 
            " INNER JOIN 'artist' a ON (a.'id_artist' = sa.'id_artist')" + 
            " INNER JOIN 'lyric' l ON (l.'id_song' = s.'id_song')";

//var myArray= 
  $cordovaSQLite.execute(db, query, []).then(function(result) {
      if(result.rows.length >0){
          var i=0;
        while(i < result.rows.length){
          $scope.results.push(result.rows.item(i));
            i++;
             console.log("####SELECTION DONE####");
            } 
            
        $ionicLoading.hide();   
        //return $scope.results;
      }
      else{
       console.log("####console######## NO results found #######");
       $scope.results.push("##### (>_<) NO results found ####");
      }
    }, function(error){
        console.log(error);
    })
})

.controller('SongDetailCtrl', function($scope, $cordovaSQLite, $stateParams,$cordovaSocialSharing, $sce, $ionicLoading){
  //var db= $cordovaSQLite.openDB({name: "lyric.db"});
  //$ionicLoading.show();
  $scope.results=[];
  var query=
            " SELECT s.*, a.*, l.*,c.* FROM 'song' s " + 
            " INNER JOIN 'category' c ON (s.id_category = c.id_category)" + 
            " INNER JOIN 'song_artist' sa ON (sa.'id_song' = s.'id_song' AND sa.'is_main_artist' = 1)" + 
            " INNER JOIN 'artist' a ON (a.'id_artist' = sa.'id_artist')" + 
            " INNER JOIN 'lyric' l ON (l.'id_song' = s.'id_song' AND  s.'id_song'=" + "'" +$stateParams.playlistId+ "'" + ")";

var myArray= $cordovaSQLite.execute(db, query, []).then(function(result) {
      if(result.rows.length >0){
        //for(var i=0, item= null; i<result.rows.length; i++){ }
        $scope.results.push(result.rows.item(0));

       //alert($scope.results[0].lyric_text );
       $scope.display_lyric = $sce.trustAsHtml($scope.results[0].lyric_text ); 

       $scope.display_video = $sce.trustAsHtml('<iframe src="'+$scope.results[0].youtube_link
        +'" frameborder="0" width="560" height="315"></iframe>');

       $scope.leftL = '<a class="tab-item" href="#" onclick="window.open(' ;
       $scope.rightL =", '_system', 'location=yes'); return false;'> <i class='icon ion-social-facebook'></i> Like </a>";
       $scope.facebook  = $sce.trustAsHtml($scope.leftL+"'"+$scope.results[0].facebook_official+"'"+ $scope.rightL );
      /* alert($scope.facebook);

       $scope.twitter = $sce.trustAsHtml('
        <a class="tab-item" href="#"  onclick="window.open('+''+$scope.results[0].twitter_official+''+', 
        '_system', 'location=yes'); return false;">
        <i class="icon ion-social-twitter"></i>
        Follow 
        </a>' );
*/
          console.log("########## SELECT-> ##############");
           $ionicLoading.hide();
        return $scope.results;
      }
      else{
       console.log("####console######## NO results found #######");
       $scope.results.push("##### (>_<) NO results found ####");
      }
    }, function(error){
        console.log(error);
    })
})

.controller('SearchCtrl',function($scope, $ionicPopup, $cordovaSQLite, $window, $location, $state) {

// Triggered on a button click, or some other target
$scope.searchPopup = function() {
  $scope.data = {}
  $scope.results=[];

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.search" placeholder="e.g mani bella" autofocus>',
    title: 'Search Song/Artist',
    subTitle: 'Enjoy the lyric',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Search</b>',
        type: 'button-energized',
        onTap: function(e) {
          if (!$scope.data.search) {
            //don't allow the user to close unless he enters search keyword
            e.preventDefault();
          } else {
              //move to the search template on confirmation
             $state.go('app.search');

            return $scope.data.search;
          }
        }
      }
    ]
  });
  myPopup.then(function(res) {
    console.log('Search word entered!: ', res);
     search_key=angular.lowercase(res);
     $scope.results=[];
     var query= 
            "SELECT s.*, c.*, l.*\
            FROM `song` s\
            LEFT JOIN `song_artist` sa ON (sa.`id_song` = s.`id_song`)\
            LEFT JOIN `artist` a ON (a.`id_artist` = sa.`id_artist`)\
            LEFT JOIN `lyric` l on (l.`id_song` = s.`id_song`)\
            LEFT JOIN `category` c ON (c.`id_category` = s.`id_category`)\
            WHERE s.`title` LIKE '%"+search_key+"%' OR\
                  s.`album_name` LIKE '%"+search_key+"%' OR\
                  s.`production_house` LIKE '%"+search_key+"%' OR\
                  a.`name` LIKE '%"+search_key+"%' OR\
                  l.`lyric_text` LIKE '%"+search_key+"%' OR\
                  s.`date_release` LIKE '%"+search_key+"%' OR\
                  c.`name` LIKE '%"+search_key+"%'\
            GROUP BY s.`id_song`\
            ORDER BY s.`title` ASC,  s.`album_name` ASC, a.`name` ASC, c.`name` ASC, s.`production_house` ASC, l.`lyric_text` ASC";

      $cordovaSQLite.execute(db, query,[]).then(function(result){
          if(result.rows.length > 0){
            for(var i=0; i<result.rows.length ; i++){
              $scope.results.push(result.rows.item(i));
            }
          }
          else{
              $scope.results.push("##### (>_<) NO results found ####");
          }
      }, function (err){
        console.error('unknown error '+ err);
      })
    });
 };
})

.controller('SearchList', function($scope, $cordovaSQLite, $ionicLoading){
    $ionicLoading.show();
  $scope.results=[];
         var query= 
            "SELECT s.*, c.*, l.*\
            FROM `song` s\
            LEFT JOIN `song_artist` sa ON (sa.`id_song` = s.`id_song`)\
            LEFT JOIN `artist` a ON (a.`id_artist` = sa.`id_artist`)\
            LEFT JOIN `lyric` l on (l.`id_song` = s.`id_song`)\
            LEFT JOIN `category` c ON (c.`id_category` = s.`id_category`)\
            WHERE s.`title` LIKE '%"+search_key+"%' OR\
                  s.`album_name` LIKE '%"+search_key+"%' OR\
                  s.`production_house` LIKE '%"+search_key+"%' OR\
                  a.`name` LIKE '%"+search_key+"%' OR\
                  l.`lyric_text` LIKE '%"+search_key+"%' OR\
                  s.`date_release` LIKE '%"+search_key+"%' OR\
                  c.`name` LIKE '%"+search_key+"%'\
            GROUP BY s.`id_song`\
            ORDER BY s.`title` ASC,  s.`album_name` ASC, a.`name` ASC, c.`name` ASC, s.`production_house` ASC, l.`lyric_text` ASC";

      $cordovaSQLite.execute(db, query,[]).then(function(result){
          if(result.rows.length > 0){
            for(var i=0; i<result.rows.length ; i++){
              $scope.results.push(result.rows.item(i));
            }
            $ionicLoading.hide();
          }
          else{
             $scope.results="## No Results found ##";
          }
      }, function (err){
        console.error('unknown error '+ err);
      })
})

.controller('ShareCtrl', function($scope, $cordovaSocialSharing){
   
   $scope.shareAnywhere = function() {
        
    $cordovaSocialSharing.share("Enjoy songs and their Lyrics with YourLyrics",
                                "YourLyrics", "www/img/logo.png", "http://blog.arnoldchuenffo.com");
    }

    $scope.FeedbackMail= function(){
      if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "YourLyrics Feedback mails", // Subject
            "",                      // Body
            ["arnoldtagne@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    
    }
})
 /*##########################################
  |        loading   ionic                  |
  *-########################################*/
.constant('$ionicLoadingConfig', {
  template: '<h3><icon  android="ion-loading-c" default="ion-refreshing"></icon></h3>Loading...'
})

;
