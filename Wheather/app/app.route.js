(function () {
    'use strict';
    angular.module('wtrApp')
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
          .when('/home', {
              controller: 'homeCtrl',
              templateUrl: 'home/home.tmpl.html',
              controllerAs: 'homeVm'
          })
               .when('/weather/:city/:stateCode/', {
                   controller: 'weatherCtrl',
                   controllerAs: 'weatherVm',
                   templateUrl: 'weather/weather.tmpl.html'
               })

            .otherwise({
                redirectTo: '/home'
            });
    }]);

})();
