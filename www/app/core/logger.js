/**
* @ngdoc Logger Service
* @name logger
* @description  This is the logger service for the entire application
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('logger', logger);

    logger.$inject = ['$log'];
    /* @ngInject */

    function logger($log) {
        /*jshint validthis: true */
        var service = {
            showToasts: true,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toast
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            $log.warn('Warning: ' + message, data);
        }
    }
})();
