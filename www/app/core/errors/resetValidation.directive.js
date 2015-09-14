(function() {

  'use strict';

  function resetValidation(FORM_ERRORS) {

    return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        ctrl.$setValidity(FORM_ERRORS.validationError, true);
        ctrl.$setValidity(FORM_ERRORS.invalidLogin, true);
        return viewValue;
      });
    }
  };
  }

  module.exports = ['FORM_ERRORS', resetValidation];

}());
