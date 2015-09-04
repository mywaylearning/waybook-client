'use strict';

function MeController($scope, $stateParams, user, utils) {
  $scope.user = user;
}

MeController.$inject = ['$scope', '$stateParams', 'user', 'utils'];

module.exports = MeController;
