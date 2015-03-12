'use strict';
angular.module('usfTemplateApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

	// if user is logged in then extract their name and role
	if ($rootScope.isTokenAuth()) {
		$http({method: 'GET', tokenKey: 'AppResourceOne', url: 'api/identity'}).
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
