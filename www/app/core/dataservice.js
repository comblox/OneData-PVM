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

    DataService.$inject = ['MockProjectsService', 'MockQuestionsService'];
    function DataService(MockProjectsService, MockQuestionsService) {

        var service = {
            getProjects:getProjects,
            getQuestions: getQuestions
        };

        return service;

        ////////////////

        function getProjects() {
            return MockProjectsService.query();
        }

        function getQuestions() {
            return MockQuestionsService.query();
        }

    }
})();
