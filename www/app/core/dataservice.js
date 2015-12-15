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
                                        'Azureservice', '$localStorage',
                                        'MockAlternativeReportService'];
    function DataService($q, logger, MockProjectsService, MockReportService,
                                      Azureservice, $localStorage,
                                      MockAlternativeReportService) {

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
                Azureservice.query('Projects', {
                    // Criteria Here for your query
                    skip: 0,
                    take: 500
                }).then(
                    function(data) {
                        logger.log('Project Data returned from the database: ' +
                        JSON.stringify(data[0]));
                        resolve(data);
                    },
                    function(err) {
                        logger.error('There was an error quering Azure ' + err);
                        reject();
                    });
            });
        }

    }
})();
