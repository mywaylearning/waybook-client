/* globals Highcharts */
/* eslint no-new: 0 */
function toInt(number) {
  return parseInt(number, 10);
}


function ScoreChart($timeout, $window) {
  'ngInject';
  return {
    restrict: 'AE',
    scope: {
      totalQuestions: '@',
      questionsCompleted: '@',
      questionsPending: '@',
      title: '@'
    },
    link: function(scope, el) {
      var _window = angular.element($window);
      var maxHeight = 500;
      var config;

      var onResize = function() {
        var height = el.width() * 1;

        if (height < maxHeight) {
          el.height(height);
        } else {
          el.height(maxHeight);
        }
      };

      _window.on('resize', onResize);

      scope.$on('$destroy', function() {
        _window.off('resize', onResize);
      });

      config = {
        chart: {
          renderTo: el[0],
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'Questions: <br>' + scope.totalQuestions,
          align: 'center',
          verticalAlign: 'middle',
          y: 60
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: -50,
              style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0px 1px 2px black'
              }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
          }
        },
        series: [{
          type: 'pie',
          name: 'Percentage',
          innerSize: '50%',
          data: [
            ['Completed: ' + scope.questionsCompleted, toInt(scope.questionsCompleted)],
            ['Pending: ' + scope.questionsPending, toInt(scope.questionsPending)]
          ]
        }]
      };

      $timeout(function() {
        new Highcharts.Chart(config);
      });
    }
  };
}

module.exports = ScoreChart;
