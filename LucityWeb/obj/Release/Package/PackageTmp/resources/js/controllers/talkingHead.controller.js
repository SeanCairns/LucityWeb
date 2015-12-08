(function (Controllers, undefined)
{
    Lucity.Modules.Lucity.controller("TalkingHeadCtrl", ['$scope', 'talkingHeadService',
        function ($scope, talkingHeadService)
        {
            var talkingHeadPromise = talkingHeadService.getTestimonials();
            talkingHeadPromise.then(function (data)
            {
                $scope.randomTalkingHead = data.data.testimonials[Math.floor((Math.random() * data.data.testimonials.length))];
                $scope.randomTalkingHeadImg = data.data.heads[Math.floor((Math.random() * data.data.heads.length))];
            });

        }]);
}(Lucity.Controllers = Lucity.Controllers || {} ));
