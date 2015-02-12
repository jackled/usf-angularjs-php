'use strict';

/**
 * @ngdoc overview
 * @name usfTemplateApp
 * @description
 * # usfTemplateApp
 *
 * Main module of the application.
 */
angular
  .module('usfTemplateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'UsfCAStokenAuth'
  ])
  .constant('UsfCAStokenAuthConstant', {
		'applicationUniqueId': 'f6765e988eb32cbda5dcd9ee2673c0a8',
		'applicationResources': {
			AppResourceOne: '/api/features'
		},
		'unauthorizedRoute': '/unauthorized'
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
	  .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
	  .when('/unauthorized', {
        templateUrl: 'views/unauthorized.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
