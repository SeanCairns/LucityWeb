(function (Lucity, undefined)
{
    /**
     * @ngdoc function
     * @name Lucity
     * @id Lucity
     * @description
     *
     * Set up our Lucity website parameters for AngularJS.
     **/
    Lucity.Version 		= "0.0.0";
    Lucity.PartialsPath = "/partials";
    Lucity.Modules 		= {};
    Lucity.Service 		= {};
    Lucity.Factory 		= {};
    Lucity.Configs 		= {};
    Lucity.Filters 		= {};
    Lucity.Controllers 	= {};
    Lucity.Directives = {};
    Lucity.Json = {
        "Calendar":     "resources/data/Calendar.json",
        "Team":         "resources/data/lucity_team.json",
        "Testimonials": "resources/data/testimonials.json",
        "Blogs": "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=http://blog.lucity.com/feed/",
        "YouTubePlaylist": "resources/data/YouTubePlayListMockup.json",
        "YouTubeVideoList": "resources/data/LucityUTube.json"
    };

    //YouTube playlist feed:
    //https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2C+id%2C+localizations%2C+player%2C+snippet%2C+status&channelId=UCSBBCEWsSEqzuf6nxS-xGsw&key=AIzaSyBclgmgFXlZTwT68_bPy66X8HIaqGUU9Xs


}(window.Lucity = window.Lucity || {} ));

(function (Modules, undefined)
{
    /**
     * @ngdoc object
     * @id Lucity
     * @name Lucity
     * @description
     *
     * This Module initializes the Lucity Angular module.
     **/
    Modules.Lucity = angular.module("lucity", ['ngRoute', 'ngSanitize']);

}(Lucity.Modules = Lucity.Modules || {} ));