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

        activate();

        ////////////////

        /**
        * @ngdoc function
        * @name ControllerController:activate
        * @kind function
        * @description This function
        */
        function activate() {
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated InspectionController View');
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:logout
        * @kind function
        * @description This function logs the user out of Azure AD
        */
        // vm.logout = function() {
        //     console.log('User is logged in: ' + Azureservice.isLoggedIn());
        //     Azureservice.logout();
        //     console.log('User is logged in: ' + Azureservice.isLoggedIn());
        //     $state.go('login');
        // };

    }
})();
