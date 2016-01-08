/**
* @ngdoc ImageUpload Service
* @name ImageUploadService
* @description This is the ImageUpload Service
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('ImageUploadService', ImageUploadService);

    ImageUploadService.$inject = ['api', '$q', 'FileManagerService'];
    function ImageUploadService(api, $q, FileManagerService) {

        var fileName = null;
        var urlBase = api.url;

        var service = {
            imageUpload: imageUpload
        };

        return service;

        function imageUpload(imageData, container) {

            return $q(function(resolve, reject) {
                /* jshint ignore:start */
                var fileTransfer = new FileTransfer();
                var serverURL = urlBase + 'image/' + container;
                var options = new FileUploadOptions();

                options.fileKey = 'file';

                options.fileName = Date.now()  +
                                                  '_' + Math.floor((Math.random() * 9999)) +
                                                  '_' + container +
                                                  '.jpg';

                fileName = options.fileName;
                options.mimeType = 'image/jpg';
                options.chunkedMode = false;
                options.params = {
                    'description': 'Image uploaded from mobile device'
                };
                console.log('Here we go - hold on');
                fileTransfer.upload(imageData, serverURL,
                    function () {

                        FileManagerService.moveLocalFile(imageData, container, fileName);
                        resolve(imageData);
                    },
                    function (err) {
                        reject('Upload Failed' + err);
                    }, options);
                /* jshint ignore:end */
            });
        }
    }
})();
