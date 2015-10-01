(function() {
  'use strict';

  function ChartDirective($timeout) {
    return {
      restrict: 'A',
      scope: {
        chartConfig: '='
      },
      template: '<highchart config="chartConfig"></highchart>',
      link: function(scope, el, attrs) {

        $timeout(function() {
          var config = scope.chartConfig,
              parentWidth = el.parent().width();

          if (config.size) {
            config.size.width = parentWidth;
          } else {
            config.size = {
              width: parentWidth
            }
          }

        });

      }
    }
  }

  module.exports = ['$timeout', ChartDirective];
}());
