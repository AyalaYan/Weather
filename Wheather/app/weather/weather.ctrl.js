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
        vm.currentDate = new Date();
        vm.tempType = 'c';
        vm.chartType = 'Temperature';
        var promise;

        /*****************************************************
         *                  METHODS                          *
        *****************************************************/
        vm.changeTempType = function (tempType) {
            if (vm.tempType != tempType) {
                vm.tempType = tempType;
                vm.updateChartTemp(vm.chartType);
            }
            else {
                vm.tempType = tempType;
            }
        }

        vm.updateChartTemp = function (chartType) {
            vm.chartType = chartType;
            $('#chartTemp').html('');
            var tempData = [];
            var label = '';
            switch (chartType) {
                case 'Temperature':
                    if (vm.tempType == 'c') {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.temp.metric });
                        })
                        label = 'C`';
                    }
                    else {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.temp.english });
                        })
                        label = 'F`';
                    }
                    break;
                case 'Precipitation':
                    if (vm.tempType == 'c') {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.qpf.metric });
                        })

                    }
                    else {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.qpf.english });
                        })

                    }
                    label = 'Prec';
                    break;
                case 'Wind':
                    if (vm.tempType == 'c') {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.wspd.metric });
                        })

                    }
                    else {
                        angular.forEach(vm.weatherData.hourly_forecast, function (hourlyForecast) {
                            tempData.push({ "time": hourlyForecast.FCTTIME.civil, "value": hourlyForecast.wspd.english });
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
            promise = $interval(loadWeatherData, 30000);
        };

        vm.stop = function () {
            $interval.cancel(promise);
        };

        $scope.$on('$destroy', function () {
            vm.stop();
        });

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
    }
})();