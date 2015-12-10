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

        vm.images = [1,2,3,4,5,6,7,8,9,];

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
