(function () {
    'use strict';
    angular.module('wtr.home')
         .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$rootScope', 'wtrCitiesData'];

    function homeCtrl($scope, $rootScope, wtrCitiesData) {

        /****************************************************
                   VARIABLES
       **************************************************** */
        var vm = this;
        vm.cities = null;

        /*****************************************************
       *                  METHODS                          *
       *****************************************************/
        $scope.$watch(function () { return vm.cityName; }, function (newVal, oldVal) {
            vm.resultSearchMessage = null;
            var isExists= newVal && newVal.length > 1;
            if (isExists) {
                vm.cities = wtrCitiesData.searchCitiesByKey(newVal);
                if (vm.cities == null || vm.cities == undefined || vm.cities.length < 1) {
                    vm.resultSearchMessage = 'No cities found';
                }
            }
            else {
                vm.cities = null;
            }
        });

        /*****************************************************
   *               METHODS - PRIVATE                   *
   *****************************************************/
        function init() { }
        /*****************************************************
      *                  EXECUTIONS                       *
      *****************************************************/
        init();
    }
})();
