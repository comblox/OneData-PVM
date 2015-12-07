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
                                                         '$state', 'DataService'];
        /* @ngInject */

        function InspectionController(logger, $q, CameraService, $ionicPlatform,
                                                       $state, DataService) {
            /*jshint validthis: true */
            var vm = this;
            vm.title = 'InspectionController';

            vm.questions = '';

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
                    function(data) {
                        vm.questions = data;
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
            }

            $ionicPlatform.ready(function() {
                vm.getImage = function() {
                    CameraService.camera(vm.storage)
                    .then(
                    function(img){
                        logger.info('Resolved: ' + img);
                        vm.image = img;
                    },
                    function(err){
                        logger.error('Rejected: ' + err);
                    });
                };
            });
    }
})();
