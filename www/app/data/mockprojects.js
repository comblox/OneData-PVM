/**
* @ngdoc Mock Backend
* @name MockProjectsService
* @description  This is a mock backend data store for building the app against
*
*/
(function() {
'use strict';

    angular
        .module('app')
        .factory('MockProjectsService', MockProjectsService);

        MockProjectsService.$inject = ['$http'];
        function MockProjectsService($http) {

            // Create an internal promise that resolves to the data inside project.json;
            // we'll use this promise in our own API to get the data we need.
            var json = $http.get('app/data/projects.json').then(function(response) {
                    return response.data;
             });

            // A basic JavaScript constructor to create new projects;
            // passed in data gets copied directly to the object.
            // (This is not the best design, but works for this demo.)
            var Project = function(data) {
                    if (data) {
                        angular.copy(data, this);
                    }
            };

            // The query function returns an promise that resolves to
            // an array of Projects, one for each in the JSON.
            Project.query = function() {
                return json.then(function(data) {
                    return data.map(function(project) {
                        return new Project(project);
                    });
                })
            };

            // The get function returns a promise that resolves to a
            // specific project, found by ID. We find it by looping
            // over all of them and checking to see if the IDs match.
            Project.get = function(id) {
                return json.then(function(data) {
                    var result = null;
                    angular.forEach(data, function(project) {
                        if (project.id == id) result = new Project(project);
                    });
                    return result;
                })
            };

            // Finally, the factory itself returns the entire
            // Project constructor (which has `query` and `get` attached).
            return Project;
    }
})();
