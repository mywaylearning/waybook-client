(function() {

  'use strict';

  function passwordMatch() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=passwordMatch'
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
  }

  module.exports = [passwordMatch];

}());
