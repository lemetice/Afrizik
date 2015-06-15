'use strict';

/**
 * @ngdoc overview
 * @name afrizikFirebaseApp
 * @description
 * # afrizikFirebaseApp
 *
 * Main module of the application.
 */
angular
  .module('afrizikFirebaseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .value('fbURL', 'https://afrizik.firebaseio.com/')
  .factory('Person', function (fbURL, $firebase) {
    return $firebase(new Firebase(fbURL)).$asArray();
  })
  ;
