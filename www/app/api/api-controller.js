
/**
 * @ngdoc API Controller
 * @name ApiController
 * @description This is the Controller for the API test view
 *
 * ###Additional information
 * You can write something else if you want.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('ApiController', ApiController);

    ApiController.$inject = ['$q', 'logger', '$http', 'ApiService'];
    /* @ngInject */

    function ApiController($q, logger, $http, ApiService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'ApiController';

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
                logger.info('Activated ApiController View');
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

        }

        /**
        * @ngdoc function
        * @name ControllerController:getProjects
        * @kind function
        * @description This function returns the projects from the api service
        * @returns {object}  ...
        */
        vm.getProjects = function() {
            ApiService.getProjects();
        };

    }
})();
