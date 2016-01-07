/**
 * @ngdoc Login Controller
 * @name LoginController
 * @description This is the controller for the login view
 *
 */
(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$q', 'logger', '$state'];
    /* @ngInject */

    function LoginController($q, logger, $state) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'LoginController';

        ////////////////

        /**
        * @ngdoc function
        * @name ControllerController:login
        * @kind function
        * @description This function logs the user into Azure AD
        */
        // vm.login = function() {
        //     Azureservice.login('aad')
        //         .then(function() {
        //             console.log('Login successful');
        //             $state.go('tab.dash');
        //         }, function(err) {
        //             console.error('Azure Error: ' + err);
        //         });
        // };
    }
})();
