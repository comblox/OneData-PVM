/**
* @ngdoc  OneData API Service
* @name  API Service
* @description   This is the OneData API Service
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('ApiService',  ApiService);

    ApiService.$inject = ['logger', '$http', 'api'];
    function  ApiService(logger, $http, api) {
        var service = {
            getProjects:getProjects,
            uploadReport: uploadReport,
            uploadImage: uploadImage
        };

        return service;

        ////////////////

        /**
        * @ngdoc function
        * @name ControllerController:getProjects
        * @kind function
        * @description This function returns all Projects
        * @returns {object}  containing all projects
        */
        function getProjects() {
            return $http({
                method: 'GET',
                url: api.url + 'projects'
            });
        }

        /**
        * @ngdoc function
        * @name ControllerController:uploadReport
        * @kind function
        * @description This function uploads a report to the backend storage
        * @returns {string}  reportId
        */
        function uploadReport(data) {
            return $http({
                method: 'post',
                url: api.url + 'report',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : {report: data}
            });

        }

        /**
        * @ngdoc function
        * @name ControllerController:uploadIMage
        * @kind function
        * @description This function uploads an image to the backend storage
        */
        function uploadImage(image, id) {
            var fd = new FormData();
            $http({
                method: 'post',
                url: api.url + 'image/' + id,
                headers: {
                    'Content-Type': 'undefined'
                },
                data : {upload: image}
            }).then(
                function successCallback(response) {
                    console.log(response);
                },
                function errorCallback(err) {
                    console.log('Error uploading Image: ' + JSON.stringify(err));
                });

        }
    }
})();

        // var fd = new FormData();
        // fd.append('file', file);
        // $http.post(uploadUrl, fd, {
        //     transformRequest: angular.identity,
        //     headers: {'Content-Type': undefined}
        // })
        // .success(function(){
        // })
        // .error(function(){
        // });
