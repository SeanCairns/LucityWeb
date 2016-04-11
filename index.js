
function LucityEventController($scope, $http) {
    $scope.appTitle = "Lucity Events Editor";

    $scope.saved = localStorage.getItem('LucityEvents');

    $scope.eventList = (localStorage.getItem('LucityEvents') !== null) ? JSON.parse($scope.saved) : [];

    $scope.categories = [{ name: 'Industry' }, { name: 'User Group' }, { name: 'Training' }];
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));


    $scope.addEvent = function () {
        $scope.eventList.push({
            delete: false,
            category: $scope.category,
            startDate: $scope.startDate,
            days: $scope.days,
            title: $scope.title,
            location: $scope.location,
            participation: $scope.participation,
            linkToMoreInfo: $scope.linkToMoreInfo
        });

        $scope.category = "";
        $scope.startDate = "";
        $scope.days = "";
        $scope.title = "";
        $scope.location = "";
        $scope.participation = "";
        $scope.linkToMoreInfo = "";
        localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));
    };


    $scope.archive = function () {
        var oldEvents = $scope.eventList;

        $scope.eventList = [];

        angular.forEach(oldEvents, function (event) {
            if (!event.delete) {
                $scope.eventList.push(event);
            }
        });

        localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));
    };

    $scope.loadFromWeb = function () {
        $http.get("http://localhost:64905/resources/data/EventsCalendar.json")
        .then(function (response) {
            console.log(response);
            //$scope.eventList = (localStorage.getItem('LucityEvents') !== null) ? JSON.parse($scope.saved) : [];

        });
    };

}
