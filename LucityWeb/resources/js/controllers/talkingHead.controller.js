(function (Controllers, undefined) {
    Lucity.Modules.Lucity.controller("TalkingHeadCtrl", ['$scope', '$filter', 'genericGetService',
        function ($scope, $filter, genericGetService) {
            var talkingHeadPromise = genericGetService.getData(Lucity.Json.Testimonials);
            talkingHeadPromise.then(function (response) {
                var homePageTestimonials = $filter('filter')(response.data.testimonials, { keywords: 'homePage' });
                $scope.randomTalkingHead = homePageTestimonials[Math.floor((Math.random() * homePageTestimonials.length))];
                $scope.randomTalkingHeadImg = response.data.heads[Math.floor((Math.random() * response.data.heads.length))];
            });
        }]);
}(Lucity.Controllers = Lucity.Controllers || {}));
