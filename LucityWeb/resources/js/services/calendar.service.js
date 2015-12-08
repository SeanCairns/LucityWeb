(function (Service, undefined) {
    Lucity.Modules.Lucity.service("calendarService", ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();

        $http.get(Lucity.Json.Calendar).then(function (data) {
            deferred.resolve(data);
        });
        this.getCalendar = function () {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {}));