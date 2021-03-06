/**
 * Created by Machete on 27.03.2016.
 */
describe('Results Controller', function(){
    var results = {
        "Search": [{
            Title: 'Star Wars'
        }]
    };

    var $controller;
    var $q;
    var $rootScope;
    var $scope;
    var $location;
    var omdbApi;
    var $exceptionHandler;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(module(function($exceptionHandlerProvider){
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$location_, _omdbApi_, _$httpBackend_, _$exceptionHandler_){
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
        $location = _$location_;
        $exceptionHandler = _$exceptionHandler_;
        $scope = {};


        _$httpBackend_.when('GET', function(name) {
            return name.indexOf('.html') !== -1;
        }).respond(200);
    }));

    it('Should load search results', function(){
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();
        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('Should error message on search fail', function(){
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            //deferred.resolve(results);
            deferred.reject('Something went wrong!');
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();

        expect($exceptionHandler.errors).toEqual(['Something went wrong!']);
    });
});