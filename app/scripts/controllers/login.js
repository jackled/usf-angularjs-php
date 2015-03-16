'use strict';
angular.module('usfTemplateApp')
	.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
		// This should never be called unless token is missing, which means that
		// following call will return a 401 and /api/identity will be called again in the main controller.
		$http({method: 'PUT', tokenKey: 'AppResourceOne', url: 'api/identity'}).
			success(function (data) {
				$rootScope.name = data.name;
				$rootScope.role = data.role;
				$scope.loading = false;
			}).
			error(function (data, status) {
				$scope.loading = false;
				$scope.error = data && data.description ? data : createUnknownError(status);
		});
		
		$location.path('/');
}]);
