(function() {

  'use strict';

  function contenteditable($sce) {

    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if (attrs.stripBr && html === '<br>') {
              html = '';
          }
          ngModel.$setViewValue(html);
        }

        if(!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
            if (ngModel.$viewValue !== element.html()) {
              element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            }
        };

        element.bind('blur keyup change', function() {
          scope.$apply(read);
        });
      }
    };
  }

  module.exports = ['$sce', contenteditable];

}());
