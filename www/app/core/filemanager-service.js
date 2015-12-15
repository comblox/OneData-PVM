/**
* @ngdoc File Manager Service
* @name FileManagerService
* @description  This is the File Mamager Service
*
*/
(function() {
    'use strict';

    angular
        .module('app')
        .factory('FileManagerService', FileManagerService);

    FileManagerService.$inject = ['$cordovaFile', '$cordovaDialogs', '$q'];
    function FileManagerService($cordovaFile, $cordovaDialogs, $q) {

        var service = {
            createDirectory: createDirectory,
            checkDirectory: checkDirectory,
            listDirectories: listDirectories,
            removeDirectory: removeDirectory,
            moveFile: moveFile,
            moveLocalFile: moveLocalFile,
            createFile: createFile,
            checkFile: checkFile,
            listFiles: listFiles,
            removeFile: removeFile
        };

        return service;

        // Direcory and File Management Functions

        // Create a directory.  If no directory is provided, prompt for a direectory name
        // Using ngCordova plugin $cordovaFile
        function createDirectory (directory) {
            return $q(function(resolve, reject) {
                document.addEventListener('deviceready', function () {
                    if (!directory) {
                        $cordovaDialogs.prompt('Directory Name', 'New Directory')
                        .then(function(result) {
                            if (result.buttonIndex === 2) {
                                reject('Directory creation cancelled');
                            }
                            directory = result.input1;
                            create(directory);
                        });
                    } else {
                        create(directory);
                    }
                    function create(directory) {
                        $cordovaFile.createDir(directory, false).then(function (success) {
                            resolve(JSON.stringify(success));
                        },
                    function (error) {
                        reject(JSON.stringify(error));
                    });
                    }
                });
            });
        }
        // Check if a directory exists
        // Using ngCordova plugin $cordovaFile
        function checkDirectory (directory) {
            return $q(function (resolve, reject) {
                document.addEventListener('deviceready', function () {
                    $cordovaFile.checkDir(directory)
                    .then(function (success) {
                        resolve(JSON.stringify(success));
                    }, function (error) {
                        reject(JSON.stringify(error));
                    });
                });
            });
        }
        // list Directories in path
        // Using ngCordova plugin $cordovaFile
        function listDirectories (path) {
            return $q(function  (resolve, reject) {
                document.addEventListener('deviceready', function () {
                    $cordovaFile.listDir(path || '/').then(function (success) {
                        resolve(success);
                    }, function (error) {
                        reject(JSON.stringify(error));
                    });
                });
            });
        }
        // Remove a directory, including its contents
        // Using cordova plugin as ngCordova does not provide this functionality
        function removeDirectory (directory) {
            return $q(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    fs.root.getDirectory(directory, {}, function(dirEntry) {
                        dirEntry.removeRecursively(function() {
                            resolve(directory + ' was sucessfully removed');
                        }, err);
                    }, err);
                }, err);
                function err (error) {
                    reject(JSON.stringify(error));
                }
            });
        }
        // Create a new file
        // Using ngCordova plugin $cordovaFile
        function createFile (filePath) {
            return $q(function (resolve, reject) {
             $cordovaFile.createFile(filePath, true).then(function(result) {
                resolve(result);
            }, function(error) {
                reject(JSON.stringify(error));
            });
         });
        }
        // Check File exists
        // Using ngCordova plugin $cordovaFile
        function checkFile (filePath) {
            return $q(function (resolve, reject) {
                $cordovaFile.checkFile(filePath).then(function(result) {
                    resolve(result);
                }, function(error) {
                    reject(JSON.stringify(error));
                });
            });
        }
        // List files in a directory
        // Using cordova plugin as ngCordova does not provide this functionality
        function listFiles (directory) {

            function toArray(list) {
                return Array.prototype.slice.call(list || [], 0);
            }

            console.log(directory);
            return $q(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    fs.root.getDirectory('/' + directory, {}, function(directory) {
                        var dirReader = directory.createReader();
                        console.log(JSON.stringify(dirReader));
                        var entries = [];
                        var readEntries = function() {
                            dirReader.readEntries (function(results) {
                                if (!results.length) {
                                    console.log(results);
                                    resolve(entries.sort());
                                } else {
                                    entries = entries.concat(toArray(results));
                                    readEntries();
                                }
                            }, err);
                        };
                        readEntries();
                    }, err);
                }, err);
                function err (error) {
                    reject(JSON.stringify(error));
                }
            });
        }
        // Move a file to a new directory
        // Using cordova plugin as ngCordova does not provide this functionality
        function moveFile (src, dirName) {
            return $q(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    move(fs, src, dirName);
                }, err);
                function move(fs, src, dirName) {
                    fs.root.getFile(src, {}, function(fileEntry) {
                        fs.root.getDirectory(dirName, {}, function(dirEntry) {
                            resolve(fileEntry.moveTo(dirEntry));
                        }, err);
                    },err);
                }
                function err (error) {
                    reject(JSON.stringify(error));
                }
            });
        }
        // Move an image from device camera to a new directory in the app
        // Using cordova plugin as ngCordova does not provide this functionality
        function moveLocalFile (src, dirName, newName) {
            return $q(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    move(fs, src, dirName);
                }, err);
                function move(fs, src, dirName) {
                    window.resolveLocalFileSystemURL(src, function(fileEntry) {
                        fs.root.getDirectory(dirName, {}, function(dirEntry) {
                            resolve(fileEntry.moveTo(dirEntry, newName));
                        }, err);
                    },err);
                }
                function err (error) {
                    reject(JSON.stringify(error));
                }
            });
        }
        // Remove a file
        // Using cordova plugin as ngCordova does not provide this functionality
        function removeFile (filePath) {
            return $q(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    fs.root.getFile(filePath, {create: false}, function(fileEntry) {
                        fileEntry.remove(function() {
                            resolve(filePath + ' was successfully removed');
                        }, err);
                    }, err);
                }, err);
                function err (error) {
                    reject(JSON.stringify(error));
                }
            });
        }
    }
})();
