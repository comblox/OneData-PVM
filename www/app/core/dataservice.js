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

    DataService.$inject = ['$q', 'logger', 'InspectionReportService',
                                        'ClosedownReportService', 'SetupReportService',
                                        '$localStorage', '$http',
                                        'api'];
    function DataService($q, logger, InspectionReportService,
                                      ClosedownReportService, SetupReportService,
                                      $localStorage, $http,
                                      api) {

        var service = {
            getProjects:getProjects,
            getReport: getReport,
            refreshProjects: refreshProjects,
            uploadReport: uploadReport
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
                        logger.error('There was an error quering Azure ' + JSON.stringify(err));
                        reject();
                    });
                }
            });
        }

        function getReport (type) {
            console.log('Report type: ' + type);
            console.log(type === 'close');
            if (type === 'setup') {
                return SetupReportService.query();
            } else if (type === 'close') {
                return ClosedownReportService.query();
            } else {
                return InspectionReportService.query();
            }
        }

        function refreshProjects() {
            return $q(function (resolve, reject) {
                // Query Azure
                $http({
                    method: 'GET',
                    url: api.url + '/projects'
                }).then(
                function successCallback(data) {
                    resolve(data.data);
                },
                function errorCallback(err) {
                    console.log('Error fetching data from database: ' + JSON.stringify(err));
                    reject(err);
                });
            });
        }

        function uploadReport(reportData) {
            return $q(function (resolve, reject) {
                // Query Azure
                $http({
                    method: 'POST',
                    url: api.url + '/report',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {report: reportData}
                }).then(
                function successCallback(report) {
                    console.log(report.data);
                    resolve(report.data);
                },
                function errorCallback(err) {
                    console.log('Error uploading report: ' + JSON.stringify(err));
                    reject(err);
                });
            });
        }
    }
})();
