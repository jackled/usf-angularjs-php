'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', 'tokenAuth', function ($scope, $rootScope, $http, tokenAuth) {

	// Get Identity
    $http({method: 'GET', appKey: 'AppResourceIdentity'}).
    success(function (data) {
		$rootScope.name = data.name;
		$rootScope.role = data.role;
        $scope.loading = false;
		console.log($rootScope.name + ' ' + $rootScope.role);
    }).
	error(function (data, status) {
        $scope.loading = false;
        $scope.error = data && data.description ? data : createUnknownError(status);
    });
	
  }]);
