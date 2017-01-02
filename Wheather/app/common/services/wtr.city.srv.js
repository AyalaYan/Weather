(function () {
    'use strict';
    angular
        .module('wtr.services')
        .factory('wtrCitiesData', wtrCitiesData);

    wtrCitiesData.$inject = ['$http', '$q'];

    function wtrCitiesData($http, $q) {

        /****************************************************
                 VARIABLES
     **************************************************** */
        var Cities = null;
        var searchCities = null;
        var service = {
            searchCitiesByKey: searchCitiesByKey
        };

        /*****************************************************
        *                  METHODS                          *
        *****************************************************/
        function searchCitiesByKey(keys) {
            keys = _.lowerCase(keys);
            searchCities = _.filter(Cities, function (cityinCities) {
                return _.startsWith(_.lowerCase(cityinCities.city), keys);
            });
            return searchCities;
        }
        /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/
        function initCities() {
            var defered = $q.defer();
            $http.get('/app/USACities.json').then(
                function (response) { defered.resolve(response.data); },
                 function (error) { defered.resolve(false); }
                )
            return defered.promise;
        }

        function init() {
            initCities().then(function (response) {
                Cities = response;
            }, function (error) {
                return null;
            });
        }



        /*****************************************************
      *                  EXECUTIONS                       *
      *****************************************************/

        init();

        return service;
    }
})();