(function (window, angular, undefined) {
  'use strict';
  
  /**
   * @ngdoc service
   * @name usfTemplateApp.LoginService
   * @description
   * # LoginService
   * Factory in the usfTemplateApp.
   */
    angular.module('usfTemplateApp')
        .factory('LoginService',['$resource','tokenAuth', function ($resource,tokenAuth) {
            // Service logic
            var loginResource = $resource(tokenAuth.getResourceUrl('distGroupMgr'),{},{
                // This should never be called unless token is missing, which means that
                // following call will return a 401 and /api/identity will be called again in the main controller.
                'loginTriggerMethod': {
                    method: 'PUT', tokenKey: 'AppResourceOne', url: 'api/identity'
                }
            });
      
            // Public API here
            return {
                loginTriggerMethod: function() {
                    return loginResource.loginTriggerMethod({}).$promise;
                }
            };
        }]);
})(window, window.angular);
