'use strict';

/**
 * @ngdoc function
 * @name usfTemplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the usfTemplateApp
 */
angular.module('usfTemplateApp')
  .controller('MainCtrl', function ($scope, $http) {

    function createUnknownError(status) {
      return {
        status: status,
        statusText: 'Internal Server Error',
        description: 'No details available'
      };
    }

    $scope.awesomeThings = [];
    $scope.loading = true;
  });
