(function() {
    'use strict';

    angular
        .module('app')
        .factory('CameraService', CameraService);

    /* @ngInject */
    function CameraService($cordovaCamera, $q) {

        var service = {
            camera: camera
        };

        return service;

        function camera(container) {

            return $q(function(resolve, reject) {

                document.addEventListener('deviceready', function () {

                }, false);

                var options = {
                    quality: 100,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(
                    function(imageData) {
                        resolve(imageData);
                    },
                    function(err) {
                        reject('Upload failed, problem with accessing the camera' + err);
                    });
            });
        }
    }
})();
