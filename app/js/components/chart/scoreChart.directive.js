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
      score: '@chartScore',
      scoreLabel: '@chartScoreLabel',
      min: '@chartMin',
      max: '@chartMax',
      increaseBy: '@chartIncreaseBy',
      title: '@chartTitle',
      label: '@chartLabel',
      hideLabel: '=chartHideLabel'
    },
    link: function(scope, el) {
      var _window = angular.element($window);
      var maxHeight = 300;
      var score = toInt(scope.score);
      var min = toInt(scope.min);
      var max = toInt(scope.max);
      var config;
      var scoreLabel = scope.scoreLabel ? scope.scoreLabel : score;

      var onResize = function() {
        var height = el.width() * 0.70;

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

      if (scope.increaseBy) {
        max = score < max ? max : score + toInt(scope.increaseBy);
      }

      config = {
        chart: {
          type: 'solidgauge',
          renderTo: el[0],
          events: {
            load: function() {
              _window.resize();
            }
          }
        },

        title: null,

        pane: {
          center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },

        tooltip: {
          enabled: false
        },

        exporting: {
          enabled: false
        },

        credits: {
          enabled: false
        },

        // the value axis
        yAxis: {
          min: min,
          max: max,
          title: {
            y: -110,
            text: scope.title
          },
          lineWidth: 0,
          minorTickInterval: null,
          tickInterval: max,
          tickWidth: 0,
          labels: {
            y: 16
          }
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 8,
              borderWidth: 0,
              useHTML: true
            },
            zones: [{
              color: '#33cd5f'
            }]
          }
        },

        series: [{
          name: 'score',
          data: [score],
          dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:40px;color:' +
              ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + scoreLabel + '</span><br/>' +
              '<span style="font-size:22px;color:silver">' + scope.label + '</span></div>'
          }
        }]

      };

      if (scope.hideLabel) {
        config.yAxis.labels.enabled = false;
      }

      new Highcharts.Chart(config);
    }
  };
}

module.exports = ScoreChart;
