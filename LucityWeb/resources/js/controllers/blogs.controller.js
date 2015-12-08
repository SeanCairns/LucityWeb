(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("BlogsCtrl", ['$scope', 'blogsService',
        function ($scope, blogsService)
        {
            var blogsPromise = blogsService.getBlogs();
            blogsPromise.then(function (data)
            {
                $scope.blog = data.responseData.feed;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));
