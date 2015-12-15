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

    DashboardController.$inject = ['logger', '$q', 'DataService', '$localStorage', '$state'];
    /* @ngInject */

    function DashboardController(logger, $q, DataService, $localStorage, $state) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'DashboardController';

        vm.myProjects = $localStorage.myProjects;

        vm.addProjects = function() {
            $state.go('tab.projects');
        };

    }
})();
