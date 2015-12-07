/**
 * @ngdoc AccountController
 * @name AccountController
 * @description This is the controller for the account view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['logger', '$q', 'DataService'];
    /* @ngInject */

    function AccountController(logger, $q, DataService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'AccountController';

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
                logger.info('Activated AccountController View');
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
