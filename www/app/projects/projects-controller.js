/**
 * @ngdoc ProjectsController
 * @name ProjectsController
 * @description This is the controller for the account view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['logger', '$q', 'DataService', '$localStorage',
                                                 '$ionicScrollDelegate', '$ionicLoading', '$scope'];
    /* @ngInject */

    function ProjectsController(logger, $q, DataService, $localStorage,
                                               $ionicScrollDelegate, $ionicLoading, $scope) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ProjectsController';

        vm.projects = '';
        vm.myProjects = $localStorage.myProjects;
        vm.wifiOnly = true;

        activate();

        ////////////////

        /**
        * @ngdoc function
        * @name ControllerController:activate
        * @kind function
        * @description This function
        */
        function activate() {
            $ionicLoading.show({
                template: 'Loading projects from the server ...'
            });
            var promises = [getData()];
            return $q.all(promises).then(function() {
                $ionicLoading.hide();
                logger.info('Activated ProjectsController View');
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

        /**
        * @ngdoc function
        * @name ControllerController:addToMyProjects
        * @kind function
        * @description This function adds a project to the user's favourites
        */
        vm.addToMyProjects = function(id) {
            // Check if we have a cache in localstorage
            if (!$localStorage.myProjects) {
                $localStorage.myProjects = [];
            }

            var project = _.find($localStorage.projects, {'id': id});
            project.show = true;

            var index = _.indexOf($localStorage.myProjects,
                               _.find($localStorage.myProjects, {'id': id}));

            if (index > 0) {
                $localStorage.myProjects.splice(index, 1);
            }

            $localStorage.myProjects.push(project);
        };

        /**
        * @ngdoc function
        * @name ControllerController:doRefresh
        * @kind function
        * @description This function refreshes the projects from the database
        */
        vm.doRefresh = function() {
            var promises = [getData()];
            return $q.all(promises).then(function() {
                $scope.$broadcast('scroll.refreshComplete');
                logger.info('Updated the projects');
            });
        };

        /**
        * @ngdoc function
        * @name ControllerController:removeMyProjects
        * @kind function
        * @description This function removes a project to the user's favourites
        */
        vm.removeMyProjects = function(id) {
            var index = _.indexOf($localStorage.myProjects,
                               _.find($localStorage.myProjects, {'id': id}));
            $localStorage.myProjects.splice(index, 1);
        };

        /**
        * @ngdoc function
        * @name ControllerController:scrollToTop
        * @kind function
        * @description This function removes a project fromt he user's home screen
        */
        vm.scrollToTop = function(id) {
            $ionicScrollDelegate.scrollTop();
        };

        /**
        * @ngdoc function
        * @name ControllerController:toggleHomeScreen
        * @kind function
        * @description This function removes a project fromt he user's home screen
        */
        vm.toggleHomeScreen = function(id) {
            var index = _.indexOf($localStorage.myProjects,
                               _.find($localStorage.myProjects, {'id': id}));
            $localStorage.myProjects[index].show = !$localStorage.myProjects[index].show;
        };

    }
})();
