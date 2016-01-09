(function() {
    'use strict';

    angular
        .module('app')
        .factory('CameraService', CameraService);

    /* @ngInject */
    function CameraService($cordovaCamera, $q, logger, AppFileStructure) {

        var service = {
            camera: camera
        };

        return service;

        function camera(container) {

            var deferred = $q.defer();

            document.addEventListener('deviceready', function () {

                var date = new Date();
                var time = date.getTime();
                //new file name
                var imageName = time + '.jpg';
                var appFolder = AppFileStructure.newImages;

                var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation:true
                    };

                $cordovaCamera.getPicture(options)
                    .then(
                        moveImage,
                        function(imageData) {
                            // We can upload here: $rootScope.imageUpload=imageData;
                            logger.success('ImageData from the camera: ' + imageData);
                        },
                        function(err) {
                            logger.error(JSON.stringify(err));
                        });

                function moveImage(imageData) {
                    logger.info('Begin moving image to persistent storage');
                    logger.info('Image data from camera: ' + imageData);
                    window.resolveLocalFileSystemURL(imageData, success, errorHandler);
                }

                function success(entry) {
                    logger.success('Successfully returned the file system');

                    //new file name
                    window.requestFileSystem(
                        LocalFileSystem.PERSISTENT,
                        0,
                        function(fileSys) {
                            logger.success('Created new folder');

                            //The folder is created if doesn't exist
                            fileSys.root.getDirectory(
                                appFolder,
                                {
                                    create:true,
                                    exclusive: false
                                },
                                function(directory) {
                                    logger.info(
                                        'Beginning to move file to: ' +
                                        JSON.stringify(directory.nativeURL)
                                    );

                                    entry.moveTo(directory, imageName,  successMove, errorHandler);

                                    logger.success(
                                        'Completed the move to: ' +
                                        JSON.stringify(directory.nativeURL)
                                    );
                                },
                                errorHandler);
                        },
                    errorHandler);
                }

                function successMove(entry) {
                    //I do my insert with 'entry.fullPath' as for the path
                    logger.success('File move was a success: ' + JSON.stringify(entry.nativeURL));
                    deferred.resolve(entry);
                }

                function errorHandler(err) {

                    var msg = '';

                        switch (err.code) {
                            case FileError.QUOTA_EXCEEDED_ERR:
                            msg = 'QUOTA_EXCEEDED_ERR';
                        break;
                        case FileError.NOT_FOUND_ERR:
                            msg = 'NOT_FOUND_ERR';
                            break;
                        case FileError.SECURITY_ERR:
                            msg = 'SECURITY_ERR';
                        break;
                            case FileError.INVALID_MODIFICATION_ERR:
                            msg = 'INVALID_MODIFICATION_ERR';
                        break;
                        case FileError.INVALID_STATE_ERR:
                            msg = 'INVALID_STATE_ERR';
                            break;
                        default:
                            msg = 'Unknown Error';
                        break;
                    };

                    logger.error('Image Capture failure: '  + JSON.stringify(err));
                    deferred.reject('Image Capture failure: ' + JSON.stringify(err));

                }
            }, false);
            return deferred.promise;
        }
    }
})();
