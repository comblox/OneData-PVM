/**
* @ngdoc Backend
* @name ClosedownReportService
* @description  This is a mock backend data store for building the app against
*
*/
(function() {
    'use strict';

    angular
    .module('app')
    .factory('ClosedownReportService', ClosedownReportService);

    ClosedownReportService.$inject = ['$http'];
    function ClosedownReportService($http) {

        // Create an internal promise that resolves to the data inside question.json;
        // we'll use this promise in our own API to get the data we need.
        var json = $http.get('app/data/close-down-report.json').then(function(response) {
            return response.data;
        });

        // A basic JavaScript constructor to create new questions;
        // passed in data gets copied directly to the object.
        // (This is not the best design, but works for this demo.)
        var Report = function(data) {
            if (data) {
                angular.copy(data, this);
            }
        };

        // The query function returns an promise that resolves to
        // an array of Reports, one for each in the JSON.
        Report.query = function() {
            return json.then(function(data) {
                return data.map(function(question) {
                    return new Report(question);
                });
            });
        };

        // The get function returns a promise that resolves to a
        // specific question, found by ID. We find it by looping
        // over all of them and checking to see if the IDs match.
        Report.get = function(id) {
            return json.then(function(data) {
                var result = null;
                angular.forEach(data, function(question) {
                    if (question.id === id) {
                        result = new Report(question);
                    }
                });
                return result;
            });
        };

        // Finally, the factory itself returns the entire
        // Report constructor (which has `query` and `get` attached).
        return Report;
    }
})();
