(function () {
    'use strict';

    angular
        .module('wtr.services')
        .factory('wtrData', wtrData);

    wtrData.$inject = ['$http', '$q'];

    function wtrData($http, $q) {

        /****************************************************
             VARIABLES
 **************************************************** */
        var Cities = null;
        var searchCities = null;
        //0def10027afaebb7
        var FORECAST_ENDPOINT = "http://api.wunderground.com/api/3ec65eb47a0795ae/geolookup/forecast/hourly/conditions/q/";

        var service = {
            getWeatherByCity: getWeatherByCity,
            weatherData: null
        };

        /*****************************************************
        *                  METHODS                          *
        *****************************************************/
       

        /*****************************************************
  *               METHODS - PRIVATE                   *
  *****************************************************/

        function getWeatherByCity(city, stateCode) {
            var defered = $q.defer();

            $http.get(FORECAST_ENDPOINT + stateCode + "/" + city + ".json")
            .then(
                function (response) {
                    wtrData.weatherData = response.data;
                    defered.resolve(response.data);
                   
                },
                 function (error) { defered.resolve(false); }
                )
            return defered.promise;
        }
        function init() {
        };

        /*****************************************************
 *                  EXECUTIONS                       *
 *****************************************************/

        init();
        return service;

    }
})();