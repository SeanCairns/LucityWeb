function LucityEventController($scope, $http, $filter) {
    var idCounter = 0;
    $scope.appTitle = "Lucity Events Editor";
    $scope.saved = localStorage.getItem('LucityEvents');
    $scope.categories = [{ id: 'events', name: 'Industry Events' }, { id: 'userGroups', name: 'Lucity User Groups' }, { id: 'training', name: 'Lucity Training' }];
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.event = [];
    $scope.eventList = (localStorage.getItem('LucityEvents') !== null) ? JSON.parse($scope.saved) : [];

    angular.forEach($scope.eventList, function (item) {
        item.id = idCounter++;
    });

    localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));

    $scope.createEvent = function (index) {
        $("#addEventDialog").modal();
    };

    $scope.addEvent = function () {
        $scope.eventList.push({
            delete: false,
            id : idCounter++,
            category: $scope.category,
            startDate: $scope.startDate,
            month: $scope.setMonthString($scope.startDate),
            days: $scope.days,
            title: $scope.title,
            location: $scope.location,
            participation: $scope.participation,
            linkToMoreInfo: $scope.linkToMoreInfo
        });

        $scope.id = "";
        $scope.category = "";
        $scope.startDate = "";
        $scope.days = "";
        $scope.title = "";
        $scope.location = "";
        $scope.participation = "";
        $scope.linkToMoreInfo = "";
        localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));
        $("#addEventDialog").modal("hide");
    };

    $scope.editEvent = function (eventId) {
        var eventToEdit = $filter('filter')($scope.eventList, { id: eventId }, true);
        if (eventToEdit.length) {
            $scope.event = angular.copy(eventToEdit[0]);
            $("#editEventDialog").modal();
        }
        else {
            alert("Error opening record");
        }
    };

    $scope.updateEvent = function () {
        var eventToSave = $filter('filter')($scope.eventList, { id: $scope.event.id }, true);
        if (eventToSave.length) {
            eventToSave[0].category = $scope.event.category;
            eventToSave[0].startDate = $scope.event.startDate;
            eventToSave[0].month = $scope.setMonthString(eventToSave[0].startDate);;
            eventToSave[0].days = $scope.event.days;
            eventToSave[0].title = $scope.event.title;
            eventToSave[0].location = $scope.event.location;
            eventToSave[0].participation = $scope.event.participation;
            eventToSave[0].linkToMoreInfo = $scope.event.linkToMoreInfo;

            $scope.event = {};
            localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));
            $("#editEventDialog").modal("hide");
        }
        else {
            alert("Error updating record");
        }
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
        if (confirm("This will overwrite any changes you have made locally. Do you want to continue?")) {
            $http.get(Lucity.Json.EventsCalendar)
            .then(function (response) {
                $scope.eventList = response.data.events;
                angular.forEach($scope.eventList, function (item) {
                    item.id = idCounter++;
                    item.month = $scope.setMonthString(item.startDate);
            });
                localStorage.setItem('LucityEvents', JSON.stringify($scope.eventList));
            });
        }
    };

    $scope.getJson = function () {
        var events = { "events": $scope.eventList };
        events = JSON.stringify(events, function (key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });

        $("#jsonAsText").html(events);
        $("#test").attr("href", "data:" + "text/json;charset=utf-8," + events);
        $("#test").attr("download", 'EventsCalendar.json');
        $("#generateJSONDialog").modal();
    };

    $scope.setMonthString = function (dateStr) {
        var month = parseInt(dateStr.substr(5, 2)) - 1;
        if (month >= 0 && month < 12) {
            return $scope.months[month];
        }
        else {
            return "";
        }
    };
}
