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

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'app/account/account.html',
                    controller: 'AccountController as vm'
                }
            }
        });

        $urlRouterProvider.otherwise('/tab/dash');

    });

})();
