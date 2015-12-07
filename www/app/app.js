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
        'ngCordova'
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
            url: '/inspection',
            views: {
                'tab-dash': {
                    templateUrl: 'app/inspection/inspection.html',
                    controller: 'InspectionController as vm'
                }
            }
        })

        .state('tab.survey', {
            url: '/survey',
            views: {
                'tab-dash': {
                    templateUrl: 'app/survey/survey.html',
                    controller: 'SurveyController as vm'
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
