(function (Service, undefined)
{
    Lucity.Modules.Lucity.service("teamService", ['$http', '$q', function ($http, $q)
    {
        var deferred = $q.defer();

        $http.get(Lucity.Json.Team).then(function (data)
        {
            deferred.resolve(data);
        });
        this.getTeamMembers = function ()
        {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {} ));