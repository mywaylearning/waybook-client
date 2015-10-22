'use strict';

function MeEditController($scope, $stateParams, $state, currentUser, UserService, utils, USER_AGE, errorHandler) {

  // Form controllers
  var _basicFormController, _passwordFormController, _ageFormController;

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
    showTodayButton: false,
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

  var _updateSelf = function(model, errorHandler) {
    UserService.updateSelf(model).then(function(response) {
      if ($scope.ageRequired) {
        return $state.go('app.main');
      }
      $state.transitionTo($state.current, {}, { reload: true });
    }).catch(errorHandler);
  };

  $scope.updateBasics = function(formController) {

    _basicFormController = formController;

    var model = {
      firstName: $scope.user.firstName,
      lastName: $scope.user.lastName,
      username: $scope.user.username,
      postalCode: $scope.user.postalCode,
      gender: $scope.user.gender
    };

    _updateSelf(model, _basicHandleError);
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

  $scope.updatePassword = function(formController) {
    var model = {
      password: $scope.password.current,
      newPassword: $scope.password.new,
      confirmPassword: $scope.password.confirm
    };

    _passwordFormController = formController;

    _updateSelf(model, _passwordHandleError);
  }

  /**
   * Handle invalid fields on password form
   */
  var _passwordHandleError = function(error) {
    error.error = 'ValidationError';
    error.details = {
      messages: {
        password: ['The current password is wrong']
      }
    };

    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController(_passwordFormController);
    _errorHandler.handle(error);
  };

  /**
   * Handle invalid fields on password form
   */
  var _basicHandleError = function(error) {
    var _errorHandler = errorHandler.getInstance($scope);

    _errorHandler.setFormController(_basicFormController);
    _errorHandler.handle(error);
  };


}

MeEditController.$inject = ['$scope', '$stateParams', '$state', 'currentUser', 'UserService', 'utils', 'USER_AGE', 'errorHandler'];

module.exports = MeEditController;
