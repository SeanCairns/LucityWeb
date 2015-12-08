(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CalendarCtrl", ['$scope', 'calendarService',
        function ($scope, calendarService) {
            var calendarPromise = calendarService.getCalendar();
            calendarPromise.then(function (data) {
                $scope.calendar = data.data;
            });

        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
