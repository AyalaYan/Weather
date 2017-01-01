(function () {
    'use strict';

    angular
        .module('app')
        .controller('app', app);

    app.$inject = ['$scope']; 

    function app($scope) {
        $scope.title = 'app';

        activate();

        function activate() { }
    }
})();
