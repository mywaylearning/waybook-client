'use strict';

function UniteDetailController($scope, $state, contact) {
  $scope.voice1 = $scope.voice2 = {};
  $scope.contact = angular.copy(contact);

  var baseVoice = {
    number: ''
  };

  $scope.model = contact;

  if (!$scope.model.voice) {
    $scope.model.voice = [angular.copy(baseVoice), angular.copy(baseVoice)];
  }

  $scope.updateContact = function() {
    $scope.model.save().then(function(result) {
      $state.go('app.unite', {}, {reload: true});
    });
  };
}

UniteDetailController.$inject = ['$scope', '$state', 'contact'];

module.exports = UniteDetailController;
