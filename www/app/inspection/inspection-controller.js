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
                                                          '$localStorage','GeolocationService',
                                                          '$ionicModal', '$ionicPopup',
                                                          '$stateParams', '$cordovaFile',
                                                          'ImageUploadService', '$ionicLoading'];
    /* @ngInject */
    /*jshint -W072 */
    function InspectionController(logger, $q, CameraService, $ionicPlatform,
                                                        $state, DataService, $scope, $localStorage,
                                                        GeolocationService, $ionicModal,
                                                        $ionicPopup, $stateParams,
                                                        $cordovaFile, ImageUploadService,
                                                        $ionicLoading) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'InspectionController';

        vm.projectName = $stateParams.projectTitle;
        vm.questions = '';
        vm.report = '';
        vm.reportDate = new Date();

        vm.directories = null;
        vm.files = null;
        vm.container = 'storage';

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
            var promises = [getData(), getLocation()];
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
                    vm.report.projectTitle = $stateParams.projectTitle;
                    logger.info('Report Id: ' + vm.report.report);
                },
                function(err) {
                    logger.error('There was an error quering Dataservice ' + err);
                });
        }

        vm.getImage = function() {
            if (!navigator.camera) {
                logger.info('Camera API not supported');
                vm.report.images.push('images/original/JPEG/example1.jpg');
                vm.report.images.push('images/original/JPEG/example2.jpg');
                vm.report.images.push('images/original/JPEG/example3.jpg');
                vm.report.images.push('images/original/JPEG/example4.jpg');
                vm.report.images.push('images/original/JPEG/example5.jpg');
                vm.report.images.push('images/original/JPEG/example6.jpg');
                vm.report.images.push('images/original/JPEG/example7.jpg');
                vm.report.images.push('images/original/JPEG/example8.jpg');
            }
            else {
                CameraService.camera(vm.storage)
                .then(
                    function(img) {
                        logger.info(
                            'Image returned from camera : ' +
                            JSON.stringify(img
                        ));
                        vm.report.images.push(
                            {
                                'path': img.nativeURL,
                                'fileName': img.name
                            }
                        );
                        return img;
                    },
                    function(err) {
                        logger.error('Rejected: ' + err);
                    });
            }
        };

        function getLocation() {
            return GeolocationService.geoLocation().then(
                function (position) {
                    console.log('Resolved: Geo Location was a success');
                    vm.report.geo.lat = position.coords.latitude;
                    vm.report.geo.long = position.coords.longitude;
                    vm.lat = '| Latitude: ' + parseFloat(position.coords.latitude).toFixed(4);
                    vm.long = 'Longtitude: ' + parseFloat(position.coords.longitude).toFixed(4);
                },
                function (err) {
                    console.log('Rejected: Geo Location failed' + err);
                });
        }

        vm.deleteReport = function() {
            delete $scope.$storage.report;
            vm.report = angular.copy(vm.questions);
            return;
        };

        vm.saveReport = function() {
            $ionicLoading.show({
                template: 'Uploading report and images ...'
            });
            var reports = $scope.$storage.pending;
            if (!reports) {
                reports = [];
            }
            reports.push(vm.report);
            $scope.$storage.pending = reports;

            DataService.uploadReport(vm.report)
            .then(
                function(id) {
                    vm.id = id;
                    for (var i = vm.report.images.length - 1; i >= 0; i--) {
                        console.log(
                            'Image for upload into container: ' +
                            id +
                            vm.report.images[i].fileName
                        );
                        ImageUploadService.uploadImage(
                            vm.report.images[i].path,
                            vm.report.images[i].fileName,
                            id
                        );
                    }
                    return;
                })
                .then(function(id) {
                    $state.go('tab.dash');
                    $ionicLoading.hide();
                    return;
                },
                function(err) {
                    logger.error('There was an error uploading the report ' + JSON.stringify(err));
                });
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

        $scope.showConfirm = function(index) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Remove Image',
                template: 'Are you sure you want to remove this image?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    vm.report.images.splice(index, 1);
                    logger.info('Image removed');
                } else {
                    logger.info('You do not want to remove this image');
                }
            });
        };

    }
})();
