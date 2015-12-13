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

    DataService.$inject = ['MockProjectsService', 'MockReportService'];
    function DataService(MockProjectsService, MockReportService) {

        var service = {
            getProjects:getProjects,
            getReport: getReport
        };

        return service;

        ////////////////

        function getProjects() {
            return MockProjectsService.query();
        }

        function getReport() {
            return MockReportService.query();
        }

    }
})();
