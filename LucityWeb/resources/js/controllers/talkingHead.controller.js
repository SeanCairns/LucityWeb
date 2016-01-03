(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("TalkingHeadCtrl", ['$scope', 'genericGetService',
        function ($scope, genericGetService) {
            var talkingHeadPromise = genericGetService.getData(Lucity.Json.Testimonials);
            talkingHeadPromise.then(function (response) {
                $scope.randomTalkingHead = response.data.testimonials[Math.floor((Math.random() * response.data.testimonials.length))];
                $scope.randomTalkingHeadImg = response.data.heads[Math.floor((Math.random() * response.data.heads.length))];
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));


