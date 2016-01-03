(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("TestimonialsCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var testimonialsPromise = genericGetService.getData(Lucity.Json.Testimonials);
            testimonialsPromise.then(function (response) {
                $scope.testimonials = response.data.testimonials;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
