/**
 * @ngdoc ProjectsController
 * @name ProjectsController
 * @description This is the controller for the account view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['logger', '$q', 'DataService'];
    /* @ngInject */

    function ProjectsController(logger, $q, DataService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProjectsController';

        vm.projects = '';
        vm.wifiOnly = true;

        activate();

        ////////////////

        /**
        * @ngdoc function
        * @name ControllerController:activate
        * @kind function
        * @description This function
        */
        function activate() {
            var promises = [getData()];
            return $q.all(promises).then(function() {
                logger.info('Activated ProjectsController View');
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:getData
        * @kind function
        * @description This function returns the data model from the dataservice
        */
        function getData() {
            DataService.getProjects()
            .then(
                function(data) {
                    vm.projects = data;
                    logger.info('Returned Projects from DataService ');
                },
                function(err) {
                    logger.error('There was an error quering Dataservice ' + err);
                });
        }

    }
})();
