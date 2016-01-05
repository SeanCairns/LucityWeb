(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("resourcesSearchCtrl", ['$scope', "$sce", 
        function ($scope, $sce) {
            $scope.resourceSearch = {
                "v" : "latest",
                "s" : "",
                "t" : "help"
            };

            $scope.resourceSearchSubmitForm = function () {
                var resourceSearchGetString = 'http://help.lucity.com/' + "portal/#v=" + encodeURIComponent($scope.resourceSearch.v) + "&s=" + encodeURIComponent($scope.resourceSearch.s) + "&t=" + encodeURIComponent($scope.resourceSearch.t) + "&n=5&p=1&c=1111111111111";
                $("#resourceSearch").attr("href", resourceSearchGetString);
                console.log($("#resourceSearch").attr("action"));
                resourceSearch.click();
            }
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
