function wordsCount() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var minWords;
      var totalWords;
      var isValid;
      if (attrs.wayMinimumWords === 'false') {
        return;
      }

      minWords = parseInt(attrs.wayMinimumWords, 10);

      scope.$watch(attrs.ngModel, function(value) {
        totalWords = value.split(/\s+/).length;
        isValid = totalWords >= minWords;
        ctrl.$setValidity('minimunWords', isValid);
      });
    }
  };
}

module.exports = wordsCount;
