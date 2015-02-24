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

	// This should never be called unless token is missing, which means that
	// following call will return a 401 and /api/identity will be called again from main so no need to do anything here...
    $http({method: 'GET', appKey: 'AppResourceOne', url: '/api/identity'}).
    success(function (data) {
        $scope.loading = false;
    }).
	error(function (data, status) {
        $scope.loading = false;
        $scope.error = data && data.description ? data : createUnknownError(status);
    });
	
  }]);
