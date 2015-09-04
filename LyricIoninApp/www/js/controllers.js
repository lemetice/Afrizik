/*########################################################
 Author: Arnold Chuenffo
 Description:     Database and controllers
 ##########################################################*/


var search_key = null;


angular.module('starter.controllers', ['ngSanitize'])

//Review application controller
        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close ita
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
        })

//Retrieving the playlists (all song) object from firebase through the ArtistService service
        .controller('PlaylistsCtrl', function ($scope, $timeout, $ionicLoading, $sce, PersonService, ArtistService) {
            $scope.playlists = [];
            $ionicLoading.show();
            var all_obj = ArtistService.all();
            //$scope.playlists = all_obj;
            all_obj
                .$loaded().then(function (data) {
                //Collect the playlists data from firebase
                $scope.playlists = data;
                //add ids to the objects in playlists. id= key generate by firebase
                angular.forEach($scope.playlists, function(item, key) {
                   //console.log(item, key);
                  // item["pl_id"]= key;
                   //console.log(item);
                 });
                $ionicLoading.hide();
            })
                .catch(function (error) {
                    console.error("Error:", error);
                    //alert("Error:", error + '\n' + 'You are not connected!');
            });

            
            /* $scope.playlists=[];
             //Loading data
             
             
             PersonService.GetFeed().then(function(items){
             $scope.playlists = items;
             });
             
             $scope.doRefresh = function() {
             PersonService.GetNewUser().then(function(items){
             $scope.playlists = items.concat($scope.items);    $scope.$broadcast('scroll.refreshComplete');
             });
             };*/


        })

//Retrieve the playlist (one song) from the ArtistService service
        .controller('PlaylistCtrl', function ($scope, $stateParams, $http, $state, $ionicLoading, $sce, ArtistService, $ionicActionSheet, $ionicPopover) {
            $scope.playlist = {};
            //Get the param of the current url
            console.log($stateParams);
            
            song_obj = ArtistService.oneSong($stateParams.id);
            $scope.playlist = song_obj;
            console.log($scope.playlist);

            song_obj.
                    $loaded().then(function (data) {

                $scope.playlist = data;
                //console.log($scope.playlist.$id);
                /*embedded html*/
                $scope.display_lyric = $sce.trustAsHtml($scope.playlist.lyrics);

                $scope.display_video = $sce.trustAsHtml('<iframe src="' + $scope.playlist.song_link
                        + '" frameborder="0" width="560" height="315"></iframe>');

                $scope.display_facebook =  $sce.trustAsHtml('<span class="custom-span custom-icon" '+ 
                    'onclick="window.open(' +
                    "'" + $scope.playlist.facebook + "'" +
                    ', \'_system\' '+
                    ', \'location=yes\'' +
                    '); return false;" ' +
                    '><i class=' +
                    '"icon ion-social-facebook" '+
                    '></i> </span>'
                    );            
                $scope.display_twitter = $sce.trustAsHtml('<span class="custom-span custom-icon" '+ 
                    'onclick="window.open(' +
                    "'" + $scope.playlist.twitter + "'" +
                    ', \'_system\' '+
                    ', \'location=yes\'' +
                    '); return false;" ' +
                    '><i class=' +
                    '"icon ion-social-twitter" '+
                    '></i> </span>'
                    );
                }).
            catch (function (error) {
                 console.log("Error: " + error);
            });

            
            //Dropdwon for artist info
                $ionicPopover.fromTemplateUrl('templates/playlistdropdown.html', {
                    scope: $scope,
                  }).then(function(popover) {
                    $scope.popover = popover;
                  });
            //Navigate to artist biography
            $scope.toProfile = function(){
                $state.go('app.userprofile');
            }
            //Action to for user to download or share song
            $scope.showActionsheet = function() {
    
                $ionicActionSheet.show({
                  titleText: 'Afrizik Action',
                  buttons: [
                    { text: '<i class="icon ion-arrow-down-b"> </i> Download' },
                    { text: '<i class="icon ion-share"> </i> Share' },
                    { text: '<i class="icon ion-card blink"> </i> Support Artist' },
                  ],
                  destructiveText: 'Cancel',
                  cancel: function() {
                    console.log('CANCELLED');
                  },
                  buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    switch(index){
                        case 0:
                            $state.go('app.userprofile');
                            break;
                        case 1:
                            $state.go('app.about');
                            break;
                        case 2:
                            $state.go('app.supportartist');
                            break;
                        default:
                            break;
                    }
                    return true;
                  },
                  destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                  }
                });
              };
            //Navigate to user profiel for more info
            $scope.userProfile = function(){
                $state.go('app.userprofile');
            }


        })
        /*Retrieve a genre of songs from soundcloud and dispaly to user*/
        .controller('SoundCloudCtrl', function ($scope, $state, $ionicModal, SCService) {
            $scope.m ;
            
/*
            $scope.SCsearch = [
                {
                  type: 'button-icon ion-compose',
                  tap: function(e) {
                    $scope.openModal();
                  }
                }
              ];
            $scope.openModal = function() {
                $scope.modal.show();
              };
            $scope.closeModal = function() {
                $scope.modal.hide();
              };
            $ionicModal.fromTemplateUrl('templates/SCsearchmodal.html', function(modal) {
                $scope.modal = modal;
              }, {
                animation: 'slide-in-up',
                focusFirstInput: true
              });   */
            
            
                //console.log(sc_search);
             SCService.GetSCUser('locko').then(function(list){
                $scope.m = list;
                console.log('MMM:' + $scope.m);
             });

            /*
             $scope.SCsearch = function(){
                $scope.modal.show();
             }
                $ionicModal.fromTemplateUrl('templates/SCsearchmodal.html', function(modal) {
                    $scope.modal = modal;
                  }, {
                    animation: 'slide-in-up',
                    focusFirstInput: true
                  });
             Fetching makossa tracks {q: 'Germany', limit:20, linked_partitioning: 1}
            SC.get('/tracks', {genres: 'rap'}, function (tracks) {
                $scope.song_tracks = tracks;
                //console.log($scope.song_tracks);
            })
                */
            //direct the user to soundcloud login page and get his profile info
            $scope.soundCloudLogin = function () {
                // initialize client with app credentials
                SC.initialize({
                    client_id: '3ecb6517e53fa8882759e1c0d4fadca8',
                    redirect_uri: 'https://soundcloud.com/connect'
                });

                // initiate auth popup
                SC.connect(function () {
                    //$state.go('app.playlists');
                    SC.get('/me', function (me) {
                        alert('Hello, ' + me.username);
                    });
                });
            }

        })

        //Retrieve a particular track and play from soundcloud
        .controller('SoundTrackCtrl', function ($scope, $stateParams, $state) {
            console.log($stateParams.id);
            $scope.playTrack = function () {
                var sound = SC.stream("/tracks/$stateParams.id", function (sound) {
                    sound.play();
                });
            }/*
             $scope.playTrack = function(){
             SC.get('/tracks', {genres:'rap'}, function(tracks){
             console.log(tracks);
             SC.stream(tracks + "/" + $stateParams, {autoPlay: true});
             });
             }*/
        })

        //Caterogies of local music available
        .controller("categoriesCtrl", function ($scope, $stateParams) {
            $scope.categories = [
                {title: 'HipHop', id: 1},
                {title: 'Makossa', id: 2},
                {title: 'Bikutsi', id: 3},
                {title: 'Benskin', id: 4},
                {title: 'Reggae', id: 5},
                {title: 'Rap', id: 6},
                {title: 'Gospel', id: 7},
                {title: 'Folklore', id: 8}
            ];
        })

        .controller("categoryCtrl", function ($scope, $stateParams) {

        })

        //Swiping informative images at the start or launch of the app
        .controller('slideBoxCtrl', function ($scope, $ionicModal) {

        })

        //Retrieve all songs under a particular category from the SQLite db
        .controller('SongsCtrl', function ($scope, $cordovaSQLite, $stateParams, $ionicLoading) {

            //var db= $cordovaSQLite.openDB({name: "lyric.db"});
            $scope.results = [];
            $ionicLoading.show();
            var query =
                    " SELECT s.*, a.*, l.*,c.* FROM 'song' s " +
                    " INNER JOIN 'category' c ON \
              (s.id_category = c.id_category AND \
              c.name=" + "'" + angular.lowercase($stateParams.categoryId) + "'" + ")" +
                    " INNER JOIN 'song_artist' sa ON (sa.'id_song' = s.'id_song' AND sa.'is_main_artist' = 1)" +
                    " INNER JOIN 'artist' a ON (a.'id_artist' = sa.'id_artist')" +
                    " INNER JOIN 'lyric' l ON (l.'id_song' = s.'id_song')";

            //var myArray= 
            $cordovaSQLite.execute(db, query, []).then(function (result) {
                if (result.rows.length > 0) {
                    var i = 0;
                    while (i < result.rows.length) {
                        $scope.results.push(result.rows.item(i));
                        i++;
                        console.log("####SELECTION DONE####");
                    }

                    $ionicLoading.hide();
                    //return $scope.results;
                }
                else {
                    console.log("####console######## NO results found #######");
                    $scope.results.push("##### (>_<) NO results found ####");
                }
            }, function (error) {
                console.log(error);
            })
        })

        //Retrieve a particular song detail from the category choosen up
        .controller('SongDetailCtrl', function ($scope, $cordovaSQLite, $stateParams, $cordovaSocialSharing, $sce, $ionicLoading) {
            //var db= $cordovaSQLite.openDB({name: "lyric.db"});
            //$ionicLoading.show();
            $scope.results = [];
            var query =
                    " SELECT s.*, a.*, l.*,c.* FROM 'song' s " +
                    " INNER JOIN 'category' c ON (s.id_category = c.id_category)" +
                    " INNER JOIN 'song_artist' sa ON (sa.'id_song' = s.'id_song' AND sa.'is_main_artist' = 1)" +
                    " INNER JOIN 'artist' a ON (a.'id_artist' = sa.'id_artist')" +
                    " INNER JOIN 'lyric' l ON (l.'id_song' = s.'id_song' AND  s.'id_song'=" + "'" + $stateParams.playlistId + "'" + ")";

            var myArray = $cordovaSQLite.execute(db, query, []).then(function (result) {
                if (result.rows.length > 0) {
                    //for(var i=0, item= null; i<result.rows.length; i++){ }
                    $scope.results.push(result.rows.item(0));

                    //alert($scope.results[0].lyric_text );
                    $scope.display_lyric = $sce.trustAsHtml($scope.results[0].lyric_text);

                    $scope.display_video = $sce.trustAsHtml('<iframe src="' + $scope.results[0].youtube_link
                            + '" frameborder="0" width="560" height="315"></iframe>');

                    $scope.leftL = '<a class="tab-item" href="#" onclick="window.open(';
                    $scope.rightL = ", '_system', 'location=yes'); return false;'> <i class='icon ion-social-facebook'></i> Like </a>";
                    $scope.facebook = $sce.trustAsHtml($scope.leftL + "'" + $scope.results[0].facebook_official + "'" + $scope.rightL);
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
                else {
                    console.log("####console######## NO results found #######");
                    $scope.results.push("##### (>_<) NO results found ####");
                }
            }, function (error) {
                console.log(error);
            })
        })

        //Search and retrieve a particular song from the SQlite database
        .controller('SearchCtrl', function ($scope, $ionicPopup, $cordovaSQLite, $window, $location, $state) {

            // Triggered on a button click, or some other target
            $scope.searchPopup = function () {
                $scope.data = {}
                $scope.results = [];

                // An elaborate, custom popup: customizing the search popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="data.search" placeholder="e.g mani bella" autofocus>',
                    title: 'Search Song/Artist',
                    subTitle: 'Enjoy the lyric',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Search</b>',
                            type: 'button-energized',
                            onTap: function (e) {
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
                myPopup.then(function (res) {
                    console.log('Search word entered!: ', res);
                    search_key = angular.lowercase(res);
                    $scope.results = [];
                    //formulating the search query
                    var query =
                            "SELECT s.*, c.*, l.*\
              FROM `song` s\
              LEFT JOIN `song_artist` sa ON (sa.`id_song` = s.`id_song`)\
              LEFT JOIN `artist` a ON (a.`id_artist` = sa.`id_artist`)\
              LEFT JOIN `lyric` l on (l.`id_song` = s.`id_song`)\
              LEFT JOIN `category` c ON (c.`id_category` = s.`id_category`)\
              WHERE s.`title` LIKE '%" + search_key + "%' OR\
                    s.`album_name` LIKE '%" + search_key + "%' OR\
                    s.`production_house` LIKE '%" + search_key + "%' OR\
                    a.`name` LIKE '%" + search_key + "%' OR\
                    l.`lyric_text` LIKE '%" + search_key + "%' OR\
                    s.`date_release` LIKE '%" + search_key + "%' OR\
                    c.`name` LIKE '%" + search_key + "%'\
              GROUP BY s.`id_song`\
              ORDER BY s.`title` ASC,  s.`album_name` ASC, a.`name` ASC, c.`name` ASC, s.`production_house` ASC, l.`lyric_text` ASC";

                    $cordovaSQLite.execute(db, query, []).then(function (result) {
                        if (result.rows.length > 0) {
                            for (var i = 0; i < result.rows.length; i++) {
                                $scope.results.push(result.rows.item(i));
                            }
                        }
                        else {
                            $scope.results.push("##### (>_<) NO results found ####");
                        }
                    }, function (err) {
                        console.error('unknown error ' + err);
                    })
                });
            };
        })

        //Retrieve the search elaborated above
        .controller('SearchList', function ($scope, $cordovaSQLite, $ionicLoading) {
            $ionicLoading.show();
            $scope.results = [];
            var query =
                    "SELECT s.*, c.*, l.*\
            FROM `song` s\
            LEFT JOIN `song_artist` sa ON (sa.`id_song` = s.`id_song`)\
            LEFT JOIN `artist` a ON (a.`id_artist` = sa.`id_artist`)\
            LEFT JOIN `lyric` l on (l.`id_song` = s.`id_song`)\
            LEFT JOIN `category` c ON (c.`id_category` = s.`id_category`)\
            WHERE s.`title` LIKE '%" + search_key + "%' OR\
                  s.`album_name` LIKE '%" + search_key + "%' OR\
                  s.`production_house` LIKE '%" + search_key + "%' OR\
                  a.`name` LIKE '%" + search_key + "%' OR\
                  l.`lyric_text` LIKE '%" + search_key + "%' OR\
                  s.`date_release` LIKE '%" + search_key + "%' OR\
                  c.`name` LIKE '%" + search_key + "%'\
            GROUP BY s.`id_song`\
            ORDER BY s.`title` ASC,  s.`album_name` ASC, a.`name` ASC, c.`name` ASC, s.`production_house` ASC, l.`lyric_text` ASC";

            $cordovaSQLite.execute(db, query, []).then(function (result) {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        $scope.results.push(result.rows.item(i));
                    }
                    $ionicLoading.hide();
                }
                else {
                    $scope.results = "## No Results found ##";
                }
            }, function (err) {
                console.error('unknown error ' + err);
            })
        })

        //share the app links with friends on social medias
        .controller('ShareCtrl', function ($scope, $cordovaSocialSharing) {

            $scope.shareAnywhere = function () {

                $cordovaSocialSharing.share("Discover, Enjoy and Support Local Music with Afrizik",
                        "Afrizik", "www/img/afrizik.png", "http://blog.arnoldchuenffo.com");
            }
            //Help us improve the app by sending feedbacks
            $scope.FeedbackMail = function () {
                if (window.plugins && window.plugins.emailComposer) {
                    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                        console.log("Response -> " + result);
                    },
                            "Afrizik Feedback mails", // Subject
                            "", // Body
                            ["arnoldtagne@gmail.com"], // To
                            null, // CC
                            null, // BCC
                            false, // isHTML
                            null, // Attachments
                            null);                   // Attachment Data
                }

            }
        })
        /*##########################################
         |        Constants                        |
         *-########################################*/
        .constant('FBURL', "https://afrizik.firebaseio.com/")
        .constant('$ionicLoadingConfig', {
            template: '<h3><icon  android="ion-loading-c" default="ion-refreshing"></icon></h3>Loading...'
        })

        /*Local events*/
        .controller('LocalEventsCtrl', function($scope){
            $scope.events = [];
            var d = new Date();
            for (var i = 0; i < 10; i++) {
                $scope.events.push({
                    "id": i,
                    "event_title": "MTN Innovation Challenge 2015", 
                    "event_pic": "img/devdays.jpg", 
                    "location":"Douala",
                    "venue":"Akwa",
                    "time": d.toLocaleTimeString(),
                    "start_date": new Date(),
                    "end_date": new Date(),
                    "artists_invited": "Charlotte Dipanda",
                    "event_desc": "Develop locally relevant VAS & mobile applications.\
                                    • Enrich our subscribers’ smartphones\
                                    experience.\
                                    • Enforce MTNC relationship with \
                                    developers’ community"
                });
            }
            console.log("Events" + $scope.events);

        })

        /*Carousel controller*/
        .controller('LocalEventDetailCtrl', function ($scope) {
            var d = new Date();
            $scope.event = {
                    "id": 2,
                    "event_title": "MTN Innovation Challenge 2015", 
                    "event_pic": "img/devdays.jpg", 
                    "location":"Douala",
                    "venue":"Akwa",
                    "time": d.toLocaleTimeString(),
                    "start_date": new Date(),
                    "end_date": new Date(),
                    "artists_invited": "Charlotte Dipanda",
                    "event_desc": "Develop locally relevant VAS & mobile applications.\
                                    • Enrich our subscribers’ smartphones\
                                    experience.\
                                    • Enforce MTNC relationship with \
                                    developers’ community"
                };
            
        })
        /*//Popover or dropdown menu
         .controller('DropdownCtrl', function($scope, $ionicPopover, $rootScope){
         $ionicPopover.fromTemplateUrl('settings.html', {
         scope: $rootScope,
         }).then(function(popover) {
         $scope.popup = popover;
         });
         
         $scope.show= function($event) {
         $scope.popover.show($event);
         };
         })*/

        ;
