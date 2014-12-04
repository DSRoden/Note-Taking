(function(){
    'use strict';

    angular.module('Note-Taking')
        .factory('Note', ['$http', function($http){

            function add(note){
                console.log('note in factory', note);
                return $http.post('/notes', note);
            }

            function getAll(){
                return $http.get('/notes');
            }

            function getOne(id){
                return $http.get('/notes/' + id);
            }

            return {add: add, getAll:getAll, getOne:getOne};
        }]);
})();
