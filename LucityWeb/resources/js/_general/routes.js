(function (Configs, undefined)
{
    Lucity.Modules.Lucity.config(['$routeProvider', function ($routeProvider)
    {
        $routeProvider
            .when('/', {
                templateUrl: Lucity.PartialsPath + '/home.html'
            })
            .when('/Company', {
                templateUrl: Lucity.PartialsPath + '/Company/company.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Management-Team', {
                templateUrl: Lucity.PartialsPath + '/Company/Management-Team.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Management-Team/:member', {
                templateUrl: Lucity.PartialsPath + '/Company/Management-Team.html',
                caseInsensitiveMatch: true
            })
            .when('/Company/Careers/:career', {
                templateUrl: Lucity.PartialsPath + '/Company/Careers/Careers.html',
                caseInsensitiveMatch: true
            })
            .when('/Software', {
                templateUrl: Lucity.PartialsPath + '/Software/software.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Enterprise-Asset-Management-Software', {
                templateUrl: Lucity.PartialsPath + '/Software/EAMS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Maintenance-Management-Software', {
                templateUrl: Lucity.PartialsPath + '/Software/MMS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Geographic-Information-System', {
                templateUrl: Lucity.PartialsPath + '/Software/GIS.html',
                caseInsensitiveMatch: true
            })
            .when('/Software/Deployment-Integration-Reporting', {
                templateUrl: Lucity.PartialsPath + '/Software/General.html',
                caseInsensitiveMatch: true
            })
            .when('/resources', {
                templateUrl: Lucity.PartialsPath + '/resources.html',
                caseInsensitiveMatch: true
            })
            .otherwise({
                redirectTo: '/',
                templateUrl: Lucity.PartialsPath + '/home.html'
            });
    }]);

    Lucity.Modules.Lucity.config(['$locationProvider', function ($locationProvider)
    {
        $locationProvider.html5Mode(true);
    }]);
}(Lucity.Configs = Lucity.Configs || {} ));
