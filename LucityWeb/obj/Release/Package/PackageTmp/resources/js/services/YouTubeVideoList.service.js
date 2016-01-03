(function (Service, undefined) {
    Lucity.Modules.Lucity.service("youTubeVideoListService", ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();

        $http.get(Lucity.Json.YouTubeVideoList).then(function (data) {
            deferred.resolve(data);
        });

        this.getVideos = function () {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {}));