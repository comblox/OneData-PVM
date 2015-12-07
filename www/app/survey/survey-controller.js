/**
 * @ngdoc Survey Controller
 * @name SurveyController
 * @description This is the Survey Controller
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('SurveyController', SurveyController);

        SurveyController.$inject = ['$q', '$state'];
        /* @ngInject */    

        function SurveyController($q, $state) {
            /*jshint validthis: true */
            var vm = this;
            vm.title = 'SurveyController';

            activate();

            /**
            * @ngdoc function
            * @name SurveyController:activate
            * @kind function
            * @description This function returns the data model
            */

            function activate() {

            }

    }
})();