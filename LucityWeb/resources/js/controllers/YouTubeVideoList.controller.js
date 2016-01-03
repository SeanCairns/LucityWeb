(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("youTubeVideoListCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var videoListPromise = genericGetService.getData(Lucity.Json.YouTubeVideoList);
            videoListPromise.then(function (response) {
                $scope.YouTubeVideoList = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));



