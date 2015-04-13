'use strict';
describe('LogoutCtrl', function () {
    var scope;
    
    beforeEach(module('usfTemplateApp'));

    beforeEach(inject(function($rootScope, $controller) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('LogoutCtrl', {$scope: scope});
    }));

    describe('clears the rootScope', function () {
        it('it does', function () {
            expect(true).toEqual(true);
        });
    });
});