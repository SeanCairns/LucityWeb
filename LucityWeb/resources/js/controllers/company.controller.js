(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("CompanyCtrl", ['$scope', '$routeParams', 'teamService',
        function ($scope, $routeParams, teamService, selectedMemberFilter)
        {
            console.log($routeParams.career);
            $scope.career = $routeParams.career;

            var promise = teamService.getTeamMembers();
            promise.then(function (data)
            {
                $scope.team = data.data.team;

                angular.forEach($scope.team.members, function(value, key){
                    value.restName = value.name.split(' ').join('-');
                    value.selected = $routeParams.member == value.restName;
                });
            })
        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));
