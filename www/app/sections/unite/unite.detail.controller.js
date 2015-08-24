'use strict';

function UniteDetailController($scope, $state, $stateParams, contact) {
  $scope.contact = contact;
}

UniteDetailController.$inject = ['$scope', '$state', '$stateParams', 'contact'];

module.exports = UniteDetailController;
