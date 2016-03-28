/**
 * Created by Machete on 27.03.2016.
 */
angular.module('movieApp').controller('SearchController', function($scope, $location, $timeout){
    var timeout;

    $scope.keyUp = function(){
        timeout = $timeout($scope.search, 1000);
    };

    $scope.keyDown = function(){
        $timeout.cancel(timeout);
    };

    $scope.search = function(){
        $timeout.cancel(timeout);
        if($scope.query){
            $location.path('/results').search('q', $scope.query);
        }
    };
});