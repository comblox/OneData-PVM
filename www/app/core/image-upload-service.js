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

    ImageUploadService.$inject = ['api', '$q', 'logger', '$cordovaFileTransfer'];
    function ImageUploadService(api, $q, logger, $cordovaFileTransfer) {

        var service = {
            uploadImage: uploadImage
        };

        return service;

        ///////////////////////

        function uploadImage(imageData, name, container) {

            return $q(function(resolve, reject) {
                document.addEventListener('deviceready', function () {
                    /* jshint ignore:start */
                    var server = api.url + '/image/' + container;
                    var fileTransfer = new FileTransfer();

                    var params = new Object();
                    params.headers = {
                        'description': 'Image uploaded from mobile device',
                        'filename': name
                    };

                    var options = new FileUploadOptions();

                    options.fileName =  name;
                    options.fileKey = 'file';
                    options.mimeType = 'image/jpg';
                    options.chunkedMode = true;
                    options.params = params;

                    logger.info('Beginning image upload of: ' +
                                       imageData + ' to: ' + server +
                                       ' as filename: ' + name);

                    fileTransfer.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable) {
                            var percentComplete = Math.round(
                                progressEvent.loaded / progressEvent.total * 100
                            );
                            logger.info('Image upload progress: ' + percentComplete + '%');
                        }
                        else {
                            loadingStatus.increment();
                        }
                    };

                    fileTransfer.upload(imageData, server,
                        function () {
                            logger.info('Image upload was a success');
                            resolve(imageData);
                        },
                        function (err) {
                            reject('Upload Failed' + err);
                        }, options);
                    /* jshint ignore:end */
                }, false);
            });
        }

    }
})();
