'use strict';

function UniteController($scope, $state, $ionicModal, $ionicPopup, $ionicActionSheet, contacts, ContactService) {
  $scope.contacts = contacts;

  $scope.modalAddSupporter = {};

  $ionicModal.fromTemplateUrl('app/sections/unite/unite.add.supporter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newSupporter = {};
    $scope.modalAddSupporter = modal;
  });

  // Triggered on a button click, or some other target
  $scope.showMenu = function(contact) {
    var actionList = $ionicActionSheet.show({
      buttons: [
       { text: 'Edit' }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      destructiveButtonClicked: function() {
        $scope.deleteSupporter(contact);
        actionList();
      },
      buttonClicked: function(index) {
        if (index === 0) {
          $state.go('products.edit', {productId: product.id});
        }
       return true;
      }
    });
  };

  $scope.openModalAddSupporter = function() {
    $scope.modalAddSupporter.show();
  };


  $scope.addSupporter = function(supporter) {
    ContactService.create(supporter).then(function(result){
      $scope.modalAddSupporter.hide();
      $state.reload();
    });
  };

  $scope.deleteSupporter = function(supporter) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete ' + supporter.firstName,
      template: 'Are you sure that you want to delete this supporter?',
      cancelText: 'No',
      okText: 'Yes'
    });


    confirmPopup.then(function(res) {
      if(res) {
        supporter.remove().then(function(result){
          $scope.contacts.splice(contacts.indexOf(supporter), 1);
        });
      }
    });

  };
}

UniteController.$inject = ['$scope', '$state', '$ionicModal', '$ionicPopup', '$ionicActionSheet', 'contacts', 'ContactService'];

module.exports = UniteController;
