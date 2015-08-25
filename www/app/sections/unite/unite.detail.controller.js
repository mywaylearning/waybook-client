'use strict';

function UniteDetailController($scope, $state, $stateParams, $ionicPopover, $ionicPopup, contact) {
  $scope.contact = contact;

  $scope.popover = {};

  $ionicPopover.fromTemplateUrl('app/sections/unite/contact.actions.html', {
    scope: $scope
  }).then(function(popover){
    $scope.popover = popover;
  });

  $scope.showPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.editSupporter = function() {
    $scope.popover.hide();
    $state.go('app.unite.edit', {contactId: contact.id});
  };

  $scope.deleteSupporter = function() {
    $scope.popover.hide();
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete ' + contact.firstName,
      template: 'Are you sure that you want to delete this contact?',
      cancelText: 'No',
      okText: 'Yes'
    });


    confirmPopup.then(function(res) {
      if(res) {
        contact.remove().then(function(result){
            $state.go('^', {}, {reload: true});
        });
      }
    });
  };
}

UniteDetailController.$inject = ['$scope', '$state', '$stateParams', '$ionicPopover', '$ionicPopup', 'contact'];

module.exports = UniteDetailController;
