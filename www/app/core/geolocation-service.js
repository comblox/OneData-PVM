/**
* @ngdoc Geolocation Service
* @name GeolocationService
* @description This is the Geolocation Service
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('GeolocationService', GeolocationService);

    GeolocationService.$inject = ['$cordovaGeolocation', '$q'];
    function GeolocationService($cordovaGeolocation, $q) {
        var service = {
            geoLocation:geoLocation
        };

        return service;

        ////////////////

        function geoLocation() {
            return $q(function(resolve, reject) {
                $cordovaGeolocation
                .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
                .then(
                    function (position) {
                        console.log('Geo Position found: ' + JSON.stringify(position.coords));
                        resolve(position);
                    },
                    function (err) {
                        var errorMsg = 'Error : ' + err.message;
                        console.log('unable to find location: ' + errorMsg);
                        reject('Geo location failed' + err);
                    });
            });
        }
    }
})();
