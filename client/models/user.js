(function(){
  'use strict';

  angular.module('Note-Taking')
    .factory('User', ['$rootScope', '$http', function($rootScope, $http){

      function register(user){
        return $http.post('/register', user);
      }

      function login(user){
        return $http.post('/login', user);
      }

      function logout(){
        return $http.delete('/logout');
      }

      return {register:register, login:login, logout:logout};
    }]);
})();
