/**
* @ngdoc Dataservice
* @name DataService
* @description  This si the dataservice for the application
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['$q', 'logger', 'MockProjectsService', 'MockReportService',
                                        '$localStorage', 'MockAlternativeReportService', '$http',
                                        'api'];
    function DataService($q, logger, MockProjectsService, MockReportService,
                                      $localStorage, MockAlternativeReportService, $http,
                                      api) {

        var service = {
            getProjects:getProjects,
            getReport: getReport,
            refreshProjects: refreshProjects
        };

        return service;

        ////////////////

        function getProjects() {
            return $q(function (resolve, reject) {
                if ($localStorage.projects) {
                    resolve($localStorage.projects);
                } else {
                    return (refreshProjects())
                    .then(
                    function(data) {
                        $localStorage.projects = data;
                        resolve(data);
                    },
                    function(err) {
                        logger.error('There was an error quering Azure ' + err);
                        reject();
                    });
                }
            });
        }

        function getReport () {
            if (!$localStorage.imsReport) {
                return MockAlternativeReportService.query();
            } else {
                return MockReportService.query();
            }
        }

        function refreshProjects() {
            return $q(function (resolve, reject) {
                // Query Azure
                $http({
                    method: 'GET',
                    url: api.url + '/ projects'
                }).then(
                function successCallback(data) {
                    resolve(data.data);
                },
                function errorCallback(err) {
                    console.log('Error fetching data from database: ' + err);
                    reject(err);
                });
            });
        }

    }
})();
