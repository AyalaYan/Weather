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
            getWeatherByCity: getWeatherByCity
        };

        /*****************************************************
        *                  METHODS                          *
        *****************************************************/

       /*
        * @description: get data of one city
        * @event: weather>loadWeatherData
        * @param: {city: string} 
        * @param: {stateCode: int} id of state
        * @returns: promise<WeatherData (json)>
        */
        function getWeatherByCity(city, stateCode) {
            var defered = $q.defer();

            $http.get(FORECAST_ENDPOINT + stateCode + "/" + city + ".json")
            .then(
                function (response) {
                    defered.resolve(response.data);
                },
                 function (error) { defered.resolve(false); }
                )
            return defered.promise;
        }

        /*****************************************************
*               METHODS - PRIVATE                   *
*****************************************************/
        function init() {
        };

        /*****************************************************
 *                  EXECUTIONS                       *
 *****************************************************/
        init();
        return service;
    }
})();