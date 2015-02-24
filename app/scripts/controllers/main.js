'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$http', 'tokenAuth', function ($scope, $rootScope, $http, tokenAuth) {

	// if token is present then extract user name and role
	if (tokenAuth.hasToken('AppResourceOne')) {
		$http({method: 'GET', appKey: 'AppResourceOne', url: '/api/identity'}).
		success(function (data) {
			$rootScope.name = data.name;
			$rootScope.role = data.role;
			$scope.loading = false;
		}).
		error(function (data, status) {
			$scope.loading = false;
			$scope.error = data && data.description ? data : createUnknownError(status);
		});
	}
				  
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
