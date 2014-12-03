(function(){
  'use strict';

  angular.module('Note-Taking')
    .controller('NavCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){

      $scope.logout = function(){
        User.logout().then(function(){
          $rootScope.rootuser = null;
          toastr.success('User successfully logged out.');
          $state.go('home');
        });
      };
    }]);
})();
