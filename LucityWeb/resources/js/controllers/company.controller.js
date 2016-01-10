(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("CompanyCtrl", ['$scope', '$routeParams', 'genericGetService',
        function ($scope, $routeParams, genericGetService, selectedMemberFilter)
        {
            $scope.career = $routeParams.career;
            $scope.showVideo = false;

            var promise = genericGetService.getData(Lucity.Json.Team);
            promise.then(function (response)
            {
                $scope.team = response.data.team;

                angular.forEach($scope.team.members, function(value, key){
                    value.restName = value.name.split(' ').join('-');
                    value.selected = $routeParams.member == value.restName;
                });
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));
