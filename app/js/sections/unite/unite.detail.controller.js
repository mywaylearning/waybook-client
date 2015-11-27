function UniteDetailController($scope, $state, $stateParams, $ionicPopover, $ionicPopup, contact) {
  'ngInject';
  $scope.contact = contact;

  $scope.popover = {};

  $ionicPopover.fromTemplateUrl('sections/unite/contact.actions.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.showPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.editSupporter = function() {
    $scope.popover.hide();
    $state.go('app.unite.edit', { contactId: contact.id });
  };

  $scope.deleteSupporter = function(_contact) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete ' + _contact.firstName,
      template: 'Are you sure that you want to delete this contact?',
      cancelText: 'No',
      okText: 'Yes'
    });

    confirmPopup.then(function(res) {
      if (res) {
        _contact.remove().then(function() {
          $state.go('^', {}, { reload: true });
        });
      }
    });
  };
}

module.exports = UniteDetailController;
