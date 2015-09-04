'use strict';

function MeController($scope, $stateParams, $ionicScrollDelegate, $location, $timeout, user, utils) {
  $scope.user = user;

  $scope.user.firstLogin = true;

  $scope.accountData = {
    changePassword: false,
    needParent: false
  };

  if ($scope.user.firstLogin) {
    $location.hash('age');
    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll(true)
    });
  }

  $scope.$watch('user.birth', function(birth) {
    if (!birth) {
      return;
    }
    var age = utils.age(birth);
    if (age < 18) {
      $scope.user.guardian = {};
      return $scope.accountData.needParent = true;
    }
    delete $scope.user.guardian;
    $scope.accountData.needParent = false;
  });

  $scope.updateUser = function() {
    $scope.user.save().then(function(result) {
      console.log('saved');
    });
  }
}

MeController.$inject = ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', '$timeout', 'user', 'utils'];

module.exports = MeController;
