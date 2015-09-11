'use strict';

function MeEditController($scope, $stateParams, $state, currentUser, user, utils, USER_AGE) {

  currentUser.birthDate = currentUser.birthDate ? new Date(currentUser.birthDate) : null;
  currentUser.gender = !currentUser.gender ? '' : currentUser.gender;

  $scope.user = currentUser;
  $scope.password = {};

  $scope.ageRequired = $stateParams.ageRequired;

  $scope.accountData = {
    underAge: false,
    needParent: false
  };

  $scope.ageConfig = {
    titleLabel: 'Your date of birth',
    inputDate: currentUser.birthDate,
    to: new Date(),
    callback: function (val) {
      if (val) {
        $scope.user.birthDate = val;
      }
    }
  };

  $scope.$watch('user.birthDate', function(birth) {
    $scope.accountData.underAge = false;
    $scope.accountData.needParent = false;
    if (!birth) {
      return;
    }
    var age = utils.age(birth);

    if (age < USER_AGE.minimumAge) {
      return $scope.accountData.underAge = true;
    }

    if (age < USER_AGE.minimumParentAge) {
      return $scope.accountData.needParent = true;
    }
  });

  var _updateSelf = function(model) {
    user.updateSelf(model).then(function(response) {
      if ($scope.ageRequired) {
        return $state.go('app.main');
      }
      $state.transitionTo($state.current, {}, { reload: true });
    });
  };

  $scope.updateBasics = function() {
    var model = {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      username: $scope.user.username,
      postalCode: $scope.user.postalCode,
      gender: $scope.user.gender
    };

    _updateSelf(model);
  };

  $scope.updateAge = function() {
    var model = {
      birthDate: $scope.user.birthDate,
      parentFirstName: $scope.user.parentFirstName,
      parentLastName: $scope.user.parentLastName,
      parentEmail: $scope.user.parentEmail,
      parentPhone: $scope.user.parentPhone,
    };

    _updateSelf(model);

  };

  $scope.updatePassword = function() {
    var model = {
      password: $scope.password.current,
      newPassword: $scope.password.new,
      confirmPassword: $scope.password.confirm
    };

    _updateSelf(model);
  }


}

MeEditController.$inject = ['$scope', '$stateParams', '$state', 'currentUser', 'user', 'utils', 'USER_AGE'];

module.exports = MeEditController;
