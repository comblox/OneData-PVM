/**
 * @ngdoc Application Core Module
 * @name app
 * @description Thisis the main app module for the application
 *
 */
 (function() {
    'use strict';

    angular
    .module('app', [
        'ionic',
        'ngCordova',
        'ngStorage'
        ])

    .constant('AppFileStructure', {
        newImages : 'images',
        uploadedImages : 'uploaded'
    })

    .run(function($ionicPlatform, AppFileStructure) {
        $ionicPlatform.ready(function() {

            // These folders will hold our images in persistent storage in our app
            // The device initially holds them in a temp directory and deletes it.
            function createDirectory(dir) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                    function(fileSystem) {
                        fileSystem.root.getDirectory(dir, {create: true},
                            function(directory) {
                                console.log('Created the directory named: ' +
                                                        JSON.stringify(directory));
                                return directory;
                            }
                        );
                    },
                    function(err) {
                        console.log('Could not create the file structure');
                    });
            }
        });
    })

    .constant('api', {
        url : 'http://onedata.azurewebsites.net',
    })

    .config(['$localStorageProvider',
        function ($localStorageProvider) {
            $localStorageProvider.setKeyPrefix('pvm-');
        }]
    )

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('login', {
            url: '/login',
            abstract: false,
            templateUrl: 'app/core/login.html',
            controller: 'LoginController as vm'
        })

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'app/core/layout.html'
        })

        .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController as vm'
                }
            },
            resolve : {
                network : function($window) {
                    if (!$window.localStorage['pvm-network']) {
                        $window.localStorage['pvm-network'] = 'true';
                    }
                }
            }
        })

        .state('tab.inspection', {
            url: '/inspection/:uid/:projectId/:projectTitle/:reportType',
            views: {
                'tab-dash': {
                    templateUrl: 'app/inspection/inspection.html',
                    controller: 'InspectionController as vm'
                }
            }
        })

        .state('tab.completed-inspections', {
            url: '/completed',
            views: {
                'tab-account': {
                    templateUrl: 'app/completed-inspections/completed-inspections.html',
                    controller: 'CompletedInspectionsController as vm'
                }
            }
        })

        .state('tab.projects', {
            url: '/projects',
            views: {
                'tab-account': {
                    templateUrl: 'app/projects/projects.html',
                    controller: 'ProjectsController as vm'
                }
            }
        })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'app/account/account.html',
                    controller: 'AccountController as vm'
                }
            }
        });

        $urlRouterProvider.otherwise('tab/dash');

    });

})();
