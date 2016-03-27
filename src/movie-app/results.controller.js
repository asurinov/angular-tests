/**
 * Created by Machete on 27.03.2016.
 */
angular.module('movieApp').controller('ResultsController', function($scope, $location, omdbApi){
    var query = $location.search().q;
    omdbApi.search(query).then(function(data){
        $scope.results = data.Search;
    }).catch(function(){
        $scope.errorMessage = 'Something went wrong!';
    });
});