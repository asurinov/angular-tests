describe('Saearch Controller', function(){
    var $controller;
    var $location;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$location_){
        $location = _$location_;
        $controller = _$controller_;
    }));

    it('should redirect to the query results page for non-empty query', function(){
        var $this = $controller('SearchController', {$location: $location}, {query: 'star wars'});
        $this.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to the query results page for empty query', function(){
        var $this = $controller('SearchController', {$location: $location}, {query: ''});
        $this.search();
        expect($location.url()).toBe('');
    });
});