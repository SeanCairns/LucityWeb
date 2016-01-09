(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("SupportCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService)
        {
            var supportPromise = genericGetService.getData(Lucity.Json.Testimonials);
            supportPromise.then(function (response)
            {
                $scope.randomTestimonial = response.data.testimonials[Math.floor((Math.random() * response.data.testimonials.length))];
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));
