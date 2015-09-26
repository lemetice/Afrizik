/*Author: Arnold Chuenffo*/
//Afrizik app custom directives
angular.module('afrizik-directives', [])
.directive('afrizikLogo', function  () {
	// body...
	return: 'E',
	templateUrl:'<div class="full-img"><img src="afrizik.png" alt="no_logo"></div>',
	scope: {
		resolveFn: '&', /*use & when passing fucntion to an attribute to a directive i.e <afrizik-logo resolve-fn="dosth()"></afrizik-logo>*/
		loadingMsg: '@', /*use @ when passing a string to an attribute of a directive i.e <afrizik-logo loading-msg='loading'></afrizik-logo>*/
		errorMSg: '@'
	},
	controller: function($scope){
		$scope.state = 'loading'
		$scope.resolveFn()
		.then (function() {
			$scope.state = 'loaded'
		}, 
		function(){
			$scope.state = 'Error'
		})
	},
	transclude: true,
})