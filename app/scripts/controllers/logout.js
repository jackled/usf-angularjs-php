'use strict';
angular.module('usfTemplateApp')
  .controller('LogoutCtrl', ['$rootScope', function ($rootScope) {
	  // perform any on exit tasks here
	  $rootScope.name = '';
	  $rootScope.role = '';
}]);
