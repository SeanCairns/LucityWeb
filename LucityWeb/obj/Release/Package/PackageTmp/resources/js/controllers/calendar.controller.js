(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CalendarCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var calendarPromise = genericGetService.getData(Lucity.Json.EventsCalendar);
            calendarPromise.then(function (response) {
                $scope.calendar = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));



