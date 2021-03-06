/**
 * Created by Machete on 27.03.2016.
 */
angular.module('movieCore', ['ngResource']);

angular.module('movieCore').factory('PopularMovies', function($resource){
    var token = 'AUTH_TOKEN';
    return $resource('popular/:movieId', {movieId: '@id'}, {
        update: {
            method: 'PUT',
            headers: { 'authToken': token }
        },
        get: {
            method: 'GET',
            headers: { 'authToken': token }
        },
        query: {
            method: 'GET',
            headers: { 'authToken': token }
        },
        save: {
            method: 'POST',
            headers: { 'authToken': token }
        },
        remove: {
            method: 'DELETE',
            headers: { 'authToken': token }
        }
    });
});
