/**
 * @ngdoc Inspection Report Contoller
 * @name InspectionController
 * @description This is the controller for the inspection report view
 *
 */
 (function() {
    'use strict';

    angular
    .module('app')
    .controller('InspectionController', InspectionController);

    InspectionController.$inject = ['logger', '$q', 'CameraService', '$ionicPlatform',
                                                          '$state', 'DataService', '$scope',
                                                          '$localStorage','$sessionStorage'];
    /* @ngInject */

    function InspectionController(logger, $q, CameraService, $ionicPlatform,
                                                        $state, DataService, $scope, $localStorage,
                                                        $sessionStorage) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'InspectionController';

        vm.report = '';
        vm.questions = '';
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
                logger.info('Activated InspectionController View');
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:getData
        * @kind function
        * @description This function returns the data model from the dataservice
        */
        function getData() {
            DataService.getQuestions()
            .then(
                function (data) {
                    $scope.$storage.report = data;
                    logger.info('Stored Projects in localstorage');
                    return data;
                })
            .then(
                function(data) {
                    vm.report = data;
                    vm.questions = angular.copy(data);
                    logger.info('Returned Questions from DataService ');
                },
                function(err) {
                    logger.error('There was an error quering Dataservice ' + err);
                });
        }

        vm.image = '';

        vm.survey = function() {
            console.log('Clicked');
            $state.go('tab.survey');
        };

        $ionicPlatform.ready(function() {
            vm.getImage = function() {
                CameraService.camera(vm.storage)
                .then(
                    function(img) {
                        logger.info('Resolved: ' + img);
                        vm.image = img;
                    },
                    function(err) {
                        logger.error('Rejected: ' + err);
                    });
            };
        });

        vm.deleteReport = function() {
            delete $scope.$storage.report;
            vm.report = angular.copy(vm.questions);
            return;
        };

        vm.saveReport = function() {
            $scope.$storage.report = vm.report;
            return;
        };
    }
})();
