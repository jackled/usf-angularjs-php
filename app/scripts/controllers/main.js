'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'tokenAuth', function ($scope, $rootScope, tokenAuth) {

	$rootScope.isTokenSet = function() { // used to control login/logout button display
		return tokenAuth.hasToken('AppResourceOne');
	}
	
    function createUnknownError(status) {
      return {
        status: status,
        statusText: 'Internal Server Error',
        description: 'No details available'
      };
    }

    $scope.awesomeThings = [];
    $scope.loading = true;
  }]);
