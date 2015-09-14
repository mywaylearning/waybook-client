(function() {

  'use strict';

  function checkPw() {

    return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        var containsUpperLetter = /[A-Z]+/.test(viewValue);
        var containsDigit = /[0-9]+/.test(viewValue);

        ctrl.$setValidity('containsUpperLetter', containsUpperLetter);
        ctrl.$setValidity('containsDigit', containsDigit);

        if (containsUpperLetter && containsDigit) {
          return viewValue;
        }
        else {
          return undefined;
        }
      });
    }
  };
  }

  module.exports = [checkPw];

}());
