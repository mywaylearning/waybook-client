/* eslint angular/document-service:0 */
function wayHelpOverlay($window, $timeout, $compile) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      helpHtml: '@help'
    },
    controller: 'HelpOverlayController',
    templateUrl: 'components/help-overlay/help-overlay.html',
    link: {
      post: function(scope, iElement, iAttrs) {
        var event = document.createEvent('Event');
        if (scope.preventHelp) {
          return;
        }

        scope.hideButton = false;

        if (angular.isDefined(iAttrs.hideButton) && iAttrs.hideButton === 'true') {
          scope.hideButton = true;
        }

        iElement.addClass('help-overlay');

        scope.loadHelpPromise.then(function(templateString) {
          var template = $compile(templateString)(scope);
          iElement.find('.dynamic-content').prepend(template);
          angular.element(document.body).append(iElement);

          if (scope.showHelp) {
            iElement.fadeIn();
          }
        });

        scope.$watch('showHelp', function(newValue) {
          if (newValue) {
            event.initEvent('resize', true, true);
            window.dispatchEvent(event);
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

module.exports = wayHelpOverlay;
