'use strict';

function MeEditController($scope, user) {
  $scope.user = user;

  $scope.accountData = {
    changePassword: false
  };

  $scope.updateUser = function() {
    $scope.user.save().then(function(result) {
      console.log('saved');
    });
  }


}

MeEditController.$inject = ['$scope', 'user'];

module.exports = MeEditController;
