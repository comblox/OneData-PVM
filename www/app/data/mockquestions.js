/**
* @ngdoc Mock Backend
* @name MockQuestionsService
* @description  This is a mock backend data store for building the app against
*
*/
(function() {
'use strict';

    angular
        .module('app')
        .factory('MockQuestionsService', MockQuestionsService);

        MockQuestionsService.$inject = ['$http'];
        function MockQuestionsService($http) {

            // Create an internal promise that resolves to the data inside question.json;
            // we'll use this promise in our own API to get the data we need.
            var json = $http.get('app/data/questions.json').then(function(response) {
                    return response.data;
             });

            // A basic JavaScript constructor to create new questions;
            // passed in data gets copied directly to the object.
            // (This is not the best design, but works for this demo.)
            var Questions = function(data) {
                    if (data) {
                        angular.copy(data, this);
                    }
            };

            // The query function returns an promise that resolves to
            // an array of Questionss, one for each in the JSON.
            Questions.query = function() {
                return json.then(function(data) {
                    return data.map(function(question) {
                        return new Questions(question);
                    });
                })
            };

            // The get function returns a promise that resolves to a
            // specific question, found by ID. We find it by looping
            // over all of them and checking to see if the IDs match.
            Questions.get = function(id) {
                return json.then(function(data) {
                    var result = null;
                    angular.forEach(data, function(question) {
                        if (question.id == id) result = new Questions(question);
                    });
                    return result;
                })
            };

            // Finally, the factory itself returns the entire
            // Questions constructor (which has `query` and `get` attached).
            return Questions;
    }
})();
