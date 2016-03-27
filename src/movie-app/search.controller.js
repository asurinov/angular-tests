/**
 * Created by Machete on 27.03.2016.
 */
angular.module('movieApp').controller('SearchController', function($location){
    this.search = function(){
        if(this.query){
            $location.path('/results').search('q', this.query);
        }
    };
});