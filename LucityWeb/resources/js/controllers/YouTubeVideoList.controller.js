(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubeVideoListCtrl", ['$scope', 'youTubeVideoListService',
        function ($scope, youTubeVideoListService) {
            var videoListPromise = youTubeVideoListService.getVideos();
            videoListPromise.then(function (data) {
                $scope.YouTubeVideoList = data.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
