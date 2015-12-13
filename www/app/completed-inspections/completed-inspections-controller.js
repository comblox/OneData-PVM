/**
 * @ngdoc Controller for Complete Inspections
 * @name CompletedInspectionsController
 * @description This si thecontroller for the compelte Inspections view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('CompletedInspectionsController', CompletedInspectionsController);

    CompletedInspectionsController.$inject = ['$q', '$scope', 'logger', '$localStorage',
                                                                        '$sessionStorage'];
    /* @ngInject */

    function CompletedInspectionsController($q, $scope, logger, $localStorage,
                                                                      $sessionStorage) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'CompletedInspectionsController';
        vm.inspections = '';
        vm.pending = '';

        $scope.$storage = $localStorage;

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
                logger.info('Activated CompletedInspectionsController View');
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:getData
        * @kind function
        * @description This function returns the data model from the dataservice
        * @returns {object}  ...
        */
        function getData() {
            vm.inspections = $scope.$storage.reports;
            vm.pending = $scope.$storage.pending;
        }

        vm.deleteInspection = function(index) {
            $scope.$storage.pending.splice(index, 1);
        };

    }
})();
