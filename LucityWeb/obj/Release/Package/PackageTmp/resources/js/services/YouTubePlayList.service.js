(function (Service, undefined) {
    Lucity.Modules.Lucity.service("youTubeService", ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();

        $http.get(Lucity.Json.YouTubePlaylist).then(function (data) {
            console.log("here");
            deferred.resolve(data);
        });

        this.getPlaylist = function () {
            return deferred.promise;
            //console.log(Lucity.Json.YouTubePlaylist);
        }
    }]);
}(Lucity.Service = Lucity.Service || {}));