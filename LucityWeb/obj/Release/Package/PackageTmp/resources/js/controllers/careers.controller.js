(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CareersCtrl", ['$scope', '$routeParams', 'genericGetService',
        function ($scope, $routeParams, genericGetService) {

            var emailLink = "mailto:jobs@lucity.com?subject=I'd like to work at Lucity!&amp;body=Here's why I'd be a great fit...";

            var careerListPromise = genericGetService.getData(Lucity.Json.Careers);
            careerListPromise.then(function (response) {
                $scope.careerList = response.data.careers;
                $scope.emailLink = encodeURI(emailLink);
            });

            if ($routeParams.career) {
                emailLink = "mailto:jobs@lucity.com?subject=I'd like to be a " + $routeParams.career.split('-').join(' ') + " at Lucity!&amp;body=Here's why I'd be a great fit...";
                $scope.career = $routeParams.career.split('-').join(' ');
                $scope.careerPath = Lucity.PartialsPath + "/Company/Careers/" + $routeParams.career + ".html"
                $scope.emailLink = encodeURI(emailLink);
            }
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
