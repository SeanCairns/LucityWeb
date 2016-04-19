(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("CalendarCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            $scope.now = Date.now();

            $scope.futureDatedEvents = function (property, startDate) {
                return function (item) {
                    if (item[property] === null)  return false;
                    if (item[property] >= startDate) return true; 
                    return false;
                }
            };

            var calendarPromise = genericGetService.getData(Lucity.Json.EventsCalendar);
            calendarPromise.then(function (response) {
                $scope.calendar = response.data;
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));

