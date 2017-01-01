(function() {
    'use strict';

    angular
        .module('app')
        .directive('app', app);

    app.$inject = ['$window'];
    
    function app ($window) {
        // Usage:
        //     <app></app>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();