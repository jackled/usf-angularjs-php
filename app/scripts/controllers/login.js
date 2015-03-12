'use strict';
angular.module('usfTemplateApp')
	.controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {
		// This should never be called unless token is missing, which means that
		// following call will return a 401 and /api/identity will be called again from main so no need to do anything here...
		$http({method: 'GET', tokenKey: 'AppResourceOne', url: 'api/identity'}).
		success(function () {
			$scope.loading = false;
		}).
		error(function () {
			$scope.loading = false;
		});
}]);
