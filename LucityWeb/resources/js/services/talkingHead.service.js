(function (Service, undefined)
{
    Lucity.Modules.Lucity.service("talkingHeadService", ['$http', '$q', function ($http, $q)
    {
        var deferred = $q.defer();

        $http.get(Lucity.Json.Testimonials).then(function (data)
        {
            deferred.resolve(data);
        });
        this.getTestimonials = function ()
        {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {} ));