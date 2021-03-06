﻿(function () {
    'use strict';
    angular
        .module('wtr.weather')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$scope', '$rootScope', '$routeParams', 'wtrData', '$interval'];
    function weatherCtrl($scope, $rootScope, $routeParams, wtrData, $interval) {
        /****************************************************
                       VARIABLES
           **************************************************** */
        var vm = this;
        vm.city = $routeParams.city;
        vm.stateCode = $routeParams.stateCode;
        vm.weatherData = null;
        vm.tempType = 'c';
        vm.chartType = 'Temperature';
        var promise;

        /*****************************************************
         *                  METHODS                          *
        *****************************************************/
        //Change the temperature type from C to F and the opposite
        vm.changeTempType = function (tempType) {
            if (vm.tempType != tempType) {
                vm.tempType = tempType;
                vm.updateChartTemp(vm.chartType);
            }
            else {
                vm.tempType = tempType;
            }
        }
            /*
         * @description: paint the weather chart 
         * @event: on buttons click: Temperature,Precipitation,Wind or change tempType
         * @param: {chartType:string} which type to show
         */
        vm.updateChartTemp = function (chartType) {
            vm.chartType = chartType;
            angular.element('#chartTemp').html('');
            var tempData = [];
            var label = '';
            switch (chartType) {
                case 'Temperature':
                    if (vm.tempType == 'c') {
                        tempData = _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.temp.metric };
                        })
                        label = 'C' + decodeURI('%C2%B0');
                    }
                    else {
                        tempData = _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.temp.english };
                        })
                        label = 'F`' + decodeURI('%C2%B0');
                    }
                    break;
                case 'Precipitation':
                    if (vm.tempType == 'c') {
                        tempData = _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.qpf.metric };
                        })

                    }
                    else {
                        tempData=  _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.qpf.english };
                        })

                    }
                    label = 'Prec';
                    break;
                case 'Wind':
                    if (vm.tempType == 'c') {
                        tempData = _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.wspd.metric };
                        })

                    }
                    else {
                        tempData = _.map(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            return { "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.wspd.english };
                        })
                    }
                    label = 'Wind';
                    break;
                default:
                    break;
            }
            new Morris.Area({
                element: 'chartTemp',
                data: tempData,
                xkey: 'time',
                ykeys: ['value'],
                parseTime: false,
                labels: [label],
                pointFillColors: ['#ffed00'],
                pointStrokeColors: ['#ffed00'],

            });
        }
        /*****************************************************
        *               METHODS - PRIVATE                   *
        *****************************************************/

        vm.start = function () {
            // stops any running interval to avoid two intervals running at the same time
            vm.stop();
            // store the interval promise
            promise = $interval(loadWeatherData, 50000);
        };

        vm.stop = function () {
            $interval.cancel(promise);
        };

        //load weather data from api
        function loadWeatherData() {
            wtrData.getWeatherByCity(vm.city, vm.stateCode).then(
                    function (data) {
                        vm.weatherData = data;
                        vm.updateChartTemp(vm.chartType);
                    });
        }

        function init() {
            loadWeatherData();
            vm.start();
        }
        /*****************************************************
        *                  EXECUTIONS                       *
        *****************************************************/
        init();
        $scope.$on('$destroy', function () {
            vm.stop();
        });
    }
})();
