/**
 * Created by Machete on 27.03.2016.
 */
angular.module('omdb', []);

angular.module('omdb').factory('omdbApi', function($http){
    var service = {};
    var baseUrl = 'http://www.omdbapi.com/?v=1&';

    service.search = function(query){
        return $http.get(baseUrl + 's=' + encodeURIComponent(query)).then(function(result){
            return result.data;
        });
    };

    service.find = function(id){
        return $http.get(baseUrl + 'i=' + id).then(function(result){
            return result.data;
        });
    };

    return service;
});
