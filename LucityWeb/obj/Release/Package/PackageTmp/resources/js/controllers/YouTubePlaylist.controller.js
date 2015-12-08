(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubePlaylistCtrl", ['$scope', 'youTubeService',
        function ($scope, youTubeService) {
            var playlistPromise = youTubeService.getPlaylist();
            playlistPromise.then(function (data) {
                $scope.YouTubePlaylists = data.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
