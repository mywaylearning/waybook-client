function contactItem() {
  return {
    restrict: 'AE',
    scope: {
      contact: '=',
      readOnly: '='
    },
    templateUrl: 'components/contact/contactItem.html',
    controller: function($scope, $state) {
      'ngInject';
      $scope.openContact = function(id) {
        if ($scope.readOnly) {
          return;
        }
        $state.go('app.unite.contact', { contactId: id });
      };
    }
  };
}

module.exports = contactItem;
