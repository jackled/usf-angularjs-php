(function (window, angular, undefined) {
    'use strict';
    angular.module('usfTemplateApp')
    .controller('DeleteCtrl', ['$scope', 'DeleteService', function ($scope, DeleteService) {
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
        DeleteService.defaultDeleteMethod()
            .then(function(data){
                $scope.loading = false;
                $scope.awesomeThings = data;

                // Get description of each thing
                $scope.awesomeThings.forEach(function (thing) {
                    thing.loading = true;
                    
                    DeleteService.customDeleteMethod(thing.href)
                        .then(function(data) {
                            thing.loading = false;
                            thing.description = data.description;
                        },
                        function(response) {
                            var data = response.data,
                                // header = response.header,
                                // config = response.config,
                                status = response.status;
                            $scope.loading = false;
                            $scope.error = data.data && data.description ? data : createUnknownError(status);
                    });
                });
            },
            function(response) {
                var data = response.data,
                    // header = response.header,
                    // config = response.config,
                    status = response.status;
                $scope.loading = false;
                $scope.error = data.data && data.description ? data : createUnknownError(status);
        });

    }]);
})(window, window.angular);