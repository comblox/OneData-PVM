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
                                                          '$localStorage','$sessionStorage',
                                                          '$ionicModal', '$ionicPopup',
                                                          '$stateParams'];
    /* @ngInject */
    /*jshint -W072 */
    function InspectionController(logger, $q, CameraService, $ionicPlatform,
                                                        $state, DataService, $scope, $localStorage,
                                                        $sessionStorage, $ionicModal, $ionicPopup,
                                                        $stateParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'InspectionController';

        vm.questions = '';
        vm.report = '';

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
            DataService.getReport()
            .then(
                function (data) {
                    $scope.$storage.report = data;
                    logger.info('Stored Report in localstorage');
                    return data;
                })
            .then(
                function (data) {
                    vm.report = data[0];
                    vm.questions = angular.copy(data[0]);
                    logger.info('Returned Report from DataService ');
                })
            .then(
                function(data) {
                    vm.report.report = $stateParams.projectId + '-' + Date.now();
                    logger.info('Report Id: ' + vm.report.report);
                },
                function(err) {
                    logger.error('There was an error quering Dataservice ' + err);
                });
        }

        $ionicPlatform.ready(function() {
            vm.getImage = function() {
                CameraService.camera(vm.storage)
                .then(
                    function(img) {
                        logger.info('Resolved: ' + img);
                        vm.report.images.push(img);
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
            var reports = $scope.$storage.reports;
            if (!reports) {
                reports = [];
            }
            reports.push(vm.report);
            $scope.$storage.reports = reports;
            $state.go('tab.dash');
            return;
        };

        // Image Survey Modal
        $ionicModal.fromTemplateUrl('app/inspection/images-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function(surveyModal) {
            $scope.surveyModal = surveyModal;
        });

        $scope.openSurveyModal = function() {
            $scope.surveyModal.show();
        };

        $scope.closeSurveyModal = function() {
            $scope.surveyModal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.surveyModal.remove();
        });
        // // Execute action on hide modal
        // $scope.$on('surveyModal.hidden', function() {
        //     // Execute action
        // });
        // // Execute action on remove modal
        // $scope.$on('surveyModal.removed', function() {
        //     // Execute action
        // });

        // Section Info Modal
        $ionicModal.fromTemplateUrl('app/inspection/info-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function(infoModal) {
            $scope.infoModal = infoModal;
        });

        $scope.openInfoModal = function(title, info) {
            $scope.infoModal.title = title;
            $scope.infoModal.info = info;
            $scope.infoModal.show();
        };

        $scope.closeInfoModal = function() {
            $scope.infoModal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.infoModal.remove();
        });
        // // Execute action on hide modal
        // $scope.$on('infoModal.hidden', function() {
        //     // Execute action
        // });
        // // Execute action on remove modal
        // $scope.$on('infoModal.removed', function() {
        //     // Execute action
        // });

        $scope.showInfo = function(section, info) {
            var alertPopup = $ionicPopup.alert({
                title: section,
                template: info
            });
            alertPopup.then(function(res) {
                console.log('Info Panel closed');
            });
        };

        $scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remove Image',
                template: 'Are you sure you want to remove this image?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    logger.info('Image removed');
                } else {
                    logger.info('You do not want to remove this image');
                }
            });
        };

    }
})();
