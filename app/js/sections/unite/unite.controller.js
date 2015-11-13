'use strict';

function UniteController($scope, $state, $ionicModal, $ionicPopup, $ionicActionSheet, contacts, ContactService) {
  $scope.contacts = contacts;

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
          $state.go('app.unite.edit', {contactId: contact.id});
        }
       return true;
      }
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
