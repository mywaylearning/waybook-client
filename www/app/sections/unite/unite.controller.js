'use strict';

function UniteController($scope, $state, $ionicModal, contacts, ContactService) {
  $scope.contacts = contacts;

  $scope.modalAddSupporter = {};

  $ionicModal.fromTemplateUrl('app/sections/unite/unite.add.supporter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newSupporter = {};
    $scope.modalAddSupporter = modal;
  });

  $scope.openModalAddSupporter = function() {
    $scope.modalAddSupporter.show();
  };


  $scope.addSupporter = function(supporter) {
    ContactService.create(supporter).then(function(result){
      $scope.modalAddSupporter.hide();
      $state.reload();
    });
  };
}

UniteController.$inject = ['$scope', '$state', '$ionicModal', 'contacts', 'ContactService'];

module.exports = UniteController;
