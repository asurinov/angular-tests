/**
 * Created by Machete on 28.03.2016.
 */
describe('HomeController', function(){
    var $scope;
    var $interval, $rootScope;
    var $controller, PopularMovies, omdbApi, $q, $exceptionHandler;

    var results = [
        {
            "Title": "film1",
            "imdbID": "id1"
        },
        {
            "Title": "film2",
            "imdbID": "id2"
        },
        {
            "Title": "film3",
            "imdbID": "id3"
        }
    ];

    beforeEach(module('movieApp'));

    beforeEach(module(function($exceptionHandlerProvider){
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function(_$q_, _omdbApi_){
        $q = _$q_;

        spyOn(_omdbApi_, 'find').and.callFake(function(){
            var deferred = _$q_.defer();
            var args = _omdbApi_.find.calls.mostRecent().args[0];
            if(args === 'tt0076759'){
                deferred.resolve(results[0]);
            }else if(args === 'tt0080684'){
                deferred.resolve(results[1]);
            } else if(args === 'tt0086190'){
                deferred.resolve(results[2]);
            } else if(args === 'ttError'){
                deferred.reject('error finding movie');
            } else {
                deferred.reject();
            }
            return deferred.promise;
        });
    }));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$interval_, _omdbApi_, _PopularMovies_, _$httpBackend_, _$exceptionHandler_){
        $scope = {};
        $interval = _$interval_;
        PopularMovies = _PopularMovies_;
        omdbApi = _omdbApi_;
        $controller = _$controller_;
        $exceptionHandler = _$exceptionHandler_;
        $rootScope = _$rootScope_;

        _$httpBackend_.when('GET', function(name) {
            return name.indexOf('.html') !== -1;
        }).respond(200);

        _$rootScope_.$apply();
    }));

    it('should rotate movie every 5 seconds', function(){
        spyOn(PopularMovies, 'get').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
            return deferred.promise;
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);
    });

    it('should handle error', function(){
        spyOn(PopularMovies, 'get').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190', 'ttError']);
            return deferred.promise;
        });

        $controller('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: omdbApi,
            PopularMovies: PopularMovies
        });
        $rootScope.$apply();

        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);

        expect($exceptionHandler.errors).toEqual(['error finding movie']);
    });
});