(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("SupportCtrl", ['$scope', '$routeParams', 'supportService',
        function ($scope, $routeParams, supportService)
        {
            var promise = supportService.getTestimonials();
            promise.then(function (data)
            {
                $scope.testimonials = data.data.testimonials;
                $scope.randomTestimonial = data.data.testimonials[Math.floor((Math.random() * $scope.testimonials.length))];
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));

