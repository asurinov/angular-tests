/**
 * Created by Machete on 27.03.2016.
 */
angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'omdb'])
    .config(function($routeProvider){
        $routeProvider.when('/results', {
            templateUrl: 'movie-app/results.html',
            controller: 'ResultsController'
        }).otherwise({
            redirectTo: '/'
        });
    });