(function () {
    'use strict';
    angular
        .module('wtr.directives')
        .directive('wtrForecast', wtrForecast);
    wtrForecast.$inject = ['$window'];
    function wtrForecast($window) {
        var directive = {
            restrict: 'E',
            templateUrl: '/app/common/directives/wtrForecast.tmpl.html',
            replace: true
        };
        return directive;
    }
})();