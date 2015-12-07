/**
 * @ngdoc Dashboard Controller
 * @name DashboardController
 * @description This is the dashboard controller for the dashboard view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger', '$q', 'DataService'];
    /* @ngInject */

    function DashboardController(logger, $q, DataService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'DashboardController';

        vm.projects = '';

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
                logger.info('Activated DashboardController View');
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:getData
        * @kind function
        * @description This function retruns the data model from the dataservice
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
