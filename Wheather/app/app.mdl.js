(function () {
    'use strict';
    angular.module('wtr.home', []);
    angular.module('wtr.weather', []);
    angular.module('wtr.services', []);
     angular.module('wtr.directives', []);
    angular.module('wtrApp', [
        // Angular modules 
        'ngRoute',
        // Custom modules 
         'wtr.weather',
         'wtr.home',
         'wtr.services',
         'wtr.directives',
    ]).run(['$rootScope', 'wtrCitiesData','wtrData', function ($rootScope, wtrCitiesData,wtrData) {   
    }]);
})();