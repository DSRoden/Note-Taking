(function(){
    'use strict';

    angular.module('Note-Taking')
        .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
            $scope.note = {};
            $scope.note.userId = $rootScope.rootuser.id;
            $scope.notes = [];

            Note.getAll().then(function(response){
                console.log(response);
                $scope.notes = response.data;
            }, function(){
                toastr.error('Error while retrieving all notes.');
            });

            $scope.submit = function(){
                Note.add($scope.note).then(function(response){
                    console.log(response);
                    var newNote = {};
                        newNote.title = response.data.title;
                        newNote.body = response.data.body;
                    $scope.notes.push(newNote);
                    $scope.note = {};
                    $scope.note.userId = $rootScope.rootuser.id;

                }, function(){
                    toastr.error('Error while sending a note.');
                    $scope.note = {};
                    $scope.note.userId = $rootScope.rootuser.id;
                });
            };
        }]);
})();

