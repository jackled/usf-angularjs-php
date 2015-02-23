'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:MainCtrl
 * @description
 * # ExitCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('ExitCtrl', function ($scope, $rootScope, tokenAuth) {
	console.log('ExitCtrl');
	tokenAuth.clearTokens();
});
