(function (Service, undefined) {
    Lucity.Modules.Lucity.service("youTubeService", ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();

        $http.get(Lucity.Json.YouTubePlaylist).then(function (data) {
            deferred.resolve(data);
        });

        this.getPlaylist = function () {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {}));