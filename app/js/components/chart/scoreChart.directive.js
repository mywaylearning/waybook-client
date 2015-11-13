(function() {
  'use strict';

  function toInt(number) {
    return parseInt(number, 10);
  }

  function ScoreChart($timeout, $window) {
    return {
      restrict: 'AE',
      scope: {
        score: '@chartScore',
        min: '@chartMin',
        max: '@chartMax',
        increaseBy: '@chartIncreaseBy',
        title: '@chartTitle',
        label: '@chartLabel',
        hideLabel: '=chartHideLabel'
      },
      link: function(scope, el, attrs) {

        var _window = angular.element($window),
            maxHeight = 300,
            score = toInt(scope.score),
            min = toInt(scope.min),
            max = toInt(scope.max);

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

        var config = {
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
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                '<span style="font-size:22px;color:silver">'+ scope.label +'</span></div>'
            }
          }],

        };

        if (scope.hideLabel) {
          config.yAxis.labels.enabled = false;
        }

        var chart = new Highcharts.Chart(config);
      }
    }
  }

  module.exports = ['$timeout', '$window', ScoreChart];
}());
