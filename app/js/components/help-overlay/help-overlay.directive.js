(function() {

  'use strict';

  function wayHelpOverlay($compile) {

    return {
      restrict: 'E',
      scope: {
        helpHtml: '@help'
      },
      controller: 'HelpOverlayController',
      templateUrl: 'app/components/help-overlay/help-overlay.html',
      link: {
        pre: function(scope, iElement, iAttrs) {

          if (scope.preventHelp) {
            return;
          }

          iElement.addClass('help-overlay');

          scope.loadHelpPromise.then(function(templateString) {
            var template = $compile(templateString)(scope);
            // console.log(template);
            iElement.find('.dynamic-content').prepend(template);
            angular.element(document.body).append(iElement);

            if (scope.showHelp) {
              iElement.fadeIn();
            }
          });
        },
        post: function(scope, iElement, iAttrs) {

          if (scope.preventHelp) {
            return;
          }

          scope.$watch('showHelp', function(newValue, oldValue) {
            if (newValue) {
              iElement.fadeIn();
            } else {
              iElement.fadeOut();
            }
          });

          iElement.on('click', function() {
            scope.hideHelp();
          });

          scope.$on('$destroy', function() {
            iElement.remove();
          });
        }
      }
    };
  }

  module.exports = ['$compile', wayHelpOverlay];

}());
