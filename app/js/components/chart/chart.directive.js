function ChartDirective($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    scope: {
      chartConfig: '='
    },
    template: '<highchart config="chartConfig"></highchart>',
    link: function(scope, el) {
      var config = scope.chartConfig;
      var parentWidth;
      $timeout(function() {
        parentWidth = el.parent().width();

        if (config.size) {
          config.size.width = parentWidth;
        } else {
          config.size = {
            width: parentWidth
          };
        }
      });
    }
  };
}

module.exports = ChartDirective;
