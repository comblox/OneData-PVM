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
        'ngStorage',
        'azure-mobile-service.module'
        ])

    .constant('AzureMobileServiceClient', {
        API_URL : 'https://traffic-management-application.azure-mobile.net/',
        API_KEY : 'DtFNrKXDARMpljivKIUtqqxuVEqgcX72',
    })

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(['$localStorageProvider',
        function ($localStorageProvider) {
            $localStorageProvider.setKeyPrefix('abv-');
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
                    if (!$window.localStorage['abv-network']) {
                        $window.localStorage['abv-network'] = 'true';
                    }
                },
                imsReport : function($window) {
                    if (!$window.localStorage['abv-imsReport']) {
                        $window.localStorage['abv-imsReport'] = 'true';
                    }
                }
            }
        })

        .state('tab.inspection', {
            url: '/inspection/:projectId/:projectTitle',
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

        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get('$state');
            var Azureservice = $injector.get('Azureservice');
            if (!Azureservice.isLoggedIn()) {
                $state.go('login');
            } else {
                $state.go('tab.dash');
            }
        });

    });

})();
