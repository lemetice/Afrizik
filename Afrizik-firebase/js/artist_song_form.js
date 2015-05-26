/**/

var a_fb = new Firebase('https://afrizik.firebaseio.com/afrizik');

angular.module('afrizik', [])

.controller('ArtistSongCtrl', function($scope){
	$scope.artist = {};

	$scope.addSong = function(){

		alert($scope.artist);
		var newArtist= $scope.artist;

		var artistRef = a_fb.child("artists");
		  artistRef.push(newArtist);
	}
})
;