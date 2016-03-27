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

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$location_, _omdbApi_){
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
        $location = _$location_;
        $scope = {};
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
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', { $scope: $scope });
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Something went wrong!');
    });
});