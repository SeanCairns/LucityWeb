(function (Service, undefined)
{
    Lucity.Modules.Lucity.service("blogsService", ['$http', '$q', function ($http, $q)
    {
        var deferred = $q.defer();

        $.ajax({url: Lucity.Json.Blogs,
            success: function(data){
                deferred.resolve(data);
            },
            error: function(error){
            },
            dataType: 'jsonp'
        });

        this.getBlogs = function ()
        {
            return deferred.promise;
        }
    }]);
}(Lucity.Service = Lucity.Service || {} ));
