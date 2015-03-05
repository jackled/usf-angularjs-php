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

	$rootScope.isAuthenticated = function() { // used to control login/logout button display
		return tokenAuth.isLoggedIn();
	}  

	// if user is logged in then extract their name and role
	if ($rootScope.isAuthenticated()) {
		$http({method: 'GET', appKey: 'AppResourceOne', url: 'api/identity'}).
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
