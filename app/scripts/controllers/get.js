'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:AboutCtrl
 * @description
 * # GetCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('GetCtrl', ['$scope', '$http', 'tokenAuth', function ($scope, $http, tokenAuth) {

    function createUnknownError(status) {
      return {
        status: status,
        statusText: 'Internal Server Error',
        description: 'No details available'
      };
    }

    $scope.awesomeThings = [];
    $scope.loading = true;

	// Get awesome things list
    $http({method: 'GET', appKey: 'AppResourceOne'}).

      success(function (data) {
        $scope.loading = false;
        $scope.awesomeThings = data;

        // Get description of each thing
        $scope.awesomeThings.forEach(function (thing) {
          thing.loading = true;

          //$http({method: 'GET', url: thing.href, ignoreAuthModule: true}).
		  $http({method: 'GET', appKey: 'AppResourceOne', url: thing.href}).

            success(function (data) {
              thing.loading = false;
              thing.description = data.description;
            }).
            error(function (data, status) {
              thing.loading = false;
              thing.error = data && data.description ? data : createUnknownError(status);
            });
        });
      }).

      error(function (data, status) {
        $scope.loading = false;
        $scope.error = data && data.description ? data : createUnknownError(status);
      });
  }]);