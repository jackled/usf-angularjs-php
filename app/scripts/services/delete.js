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
        .factory('DeleteService',['$resource','tokenAuth', function ($resource,tokenAuth) {
            // Public API here
            var service = {
                defaultDeleteMethod: function() {
                    return deleteResource.defaultDeleteMethod({}).$promise;
                },
                customDeleteMethod: function(url) {
                    this.setDeleteUrl(url);
                    return deleteResource.customDeleteMethod({}).$promise;
                },
                setDeleteUrl: function(url) {
                    this.deleteUrl = url;
                },
                getDeleteUrl: function() {
                    return this.deleteUrl;
                }
            };
            // Service logic
            var deleteResource = $resource(tokenAuth.getResourceUrl('AppResourceOne'),{},{
                'defaultDeleteMethod': {
                    method: 'DELETE', tokenKey: 'AppResourceOne'
                },
                'customDeleteMethod': {
                    method: 'DELETE', tokenKey: 'AppResourceOne', url: service.getDeleteUrl()
                }                
            });
      
            return service;
        }]);
})(window, window.angular);