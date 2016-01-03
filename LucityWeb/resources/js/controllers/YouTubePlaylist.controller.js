(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubePlaylistCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var playlistPromise = genericGetService.getData(Lucity.Json.YouTubePlaylist);
            playlistPromise.then(function (response) {
                $scope.YouTubePlaylists = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));



