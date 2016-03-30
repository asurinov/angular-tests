/**
 * Created by Machete on 29.03.2016.
 */
describe('MovieResultDirective', function(){

    var result = {
        Poster: 'http://localhost/image.jpg',
        Title: 'Star Wars: Episode IV - A New Hope',
        Director: 'George Lucas',
        Actors: 'Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing',
        Released: '25 May 1977',
        Genre: 'Action, Adventure, Fantasy',
        Plot: 'Qwerty'
    };
    var expectedHtml = [
        '<div class="col-sm-4">',
            '<img ng-src="http://localhost/image.jpg" alt="Star Wars: Episode IV - A New Hope" width="220" src="http://localhost/image.jpg">',
        '</div>',
        '<div class="col-sm-8">',
            '<h3 class="ng-binding">Star Wars: Episode IV - A New Hope</h3>',
            '<p class="ng-binding">Qwerty</p>',
            '<p class="ng-binding"><strong>Director:</strong> George Lucas</p>',
            '<p class="ng-binding"><strong>Actor:</strong> Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing</p>',
            '<p class="ng-binding"><strong>Released:</strong> 25 May 1977</p>',
            '<p class="ng-binding"><strong>Genre:</strong> Action, Adventure, Fantasy</p>',
        '</div>',
    ].join('');

    var $compile;
    var $rootScope;

    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        _$httpBackend_.when('GET', function(name) {
            return name.indexOf('.html') !== -1;
        }).respond(200);
    }));

    it('should output movie result to expected HTML format', function(){
        $rootScope.result = result;
        var element;
        element = $compile('<movie-result result="result"></movie-result>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBe(expectedHtml);
    });
});