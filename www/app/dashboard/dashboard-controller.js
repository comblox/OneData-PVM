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

    DashboardController.$inject = ['logger', '$q', 'DataService', '$localStorage', '$state',
                                                      '$scope', '$ionicModal'];
    /* @ngInject */

    function DashboardController(logger, $q, DataService, $localStorage, $state,
                                                    $scope, $ionicModal) {
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

        // Report Type MOdal
        $ionicModal.fromTemplateUrl('app/dashboard/report-type-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function(reportModal) {
            $scope.reportModal = reportModal;
        });

        $scope.openReportModal = function(project) {
            console.log('Project passed in: ' + JSON.stringify(project));
            $scope.reportModal.project = project;
            $scope.reportModal.show();
        };

        $scope.closeReportModal = function() {
            $scope.reportModal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.reportModal.remove();
        });
        // // Execute action on hide modal
        // $scope.$on('reportModal.hidden', function() {
        //     // Execute action
        // });
        // // Execute action on remove modal
        // $scope.$on('reportModal.removed', function() {
        //     // Execute action
        // });

    }
})();
