describe('Search Controller', function(){
    var $location;
    var $timeout;
    var $scope;
    var $httpBackend;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_, _$timeout_, _$httpBackend_){
        $scope = {};
        $location = _$location_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;

        $httpBackend.when('GET', function(name) {
            return name.indexOf('.html') !== -1;
        }).respond(200);

        _$controller_('SearchController', {
            $scope: $scope,
            $location: $location,
            $timeout: $timeout
        });
    }));

    it('should redirect to the query results page for non-empty query', function(){
        $scope.query =  'star wars';
        $scope.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to the query results page for empty query', function(){
        $scope.query =  '';
        $scope.search();
        expect($location.url()).toBe('');
    });

    it('should redirect after 1 second of keyboard inactivity', function(){
        $scope.query = 'star wars';
        $scope.keyUp();
        $timeout.flush();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should cancel timeout in keydown', function(){
        $scope.query = 'star wars';
        $scope.keyUp();
        $scope.keyDown();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });

    it('should cancel timeout on search', function(){
        $scope.query = 'star wars';
        $scope.keyUp();
        $scope.search();
        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
});