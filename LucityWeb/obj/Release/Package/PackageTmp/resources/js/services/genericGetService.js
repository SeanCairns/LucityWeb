(function (Services, undefined) {
    Lucity.Modules.Lucity.service("genericGetService", ['$http', '$q',
        function ($http, $q) {
            this.getData = function (url) {
                var deferred = $q.defer();

                $http.get(url).then(function (data) {
                    deferred.resolve(data);
                });

                return deferred.promise;
            }
        }]);
}(Lucity.Service = Lucity.Service || {}));
