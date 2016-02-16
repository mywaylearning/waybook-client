function Big5Controller($scope, $state, ExplorationService) {
  'ngInject';

  console.log($scope);

  var _results = $scope.results.fromServer ? $scope.results.plain() : $scope.results;

  var series = Object.keys(_results).map(function(category) {
    return {
      name: category,
      data: [{
        name: category,
        y: _results[category].score
      }],
      description: _results[category].description,
      result: _results[category].result
    };
  });

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'bar'
      },
      tooltip: {
        useHTML: true,
        formatter: function() {
          return '<strong>Category: </strong>' + this.series.name + '<strong> Score: </strong>' + this.series.userOptions.data[0].y +
            '<br/><strong>Description: </strong>' + this.series.userOptions.description +
            '<br/><strong>Result: </strong>' + this.series.userOptions.result;
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return '<strong>' + this.series.name + '</strong>';
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    },
    xAxis: [{
      title: {
        text: 'Less'
      },
      labels: {
        enabled: false,
        overflow: 'justify'
      }
    }, {
      linkedTo: 0,
      title: {
        text: 'More'
      },
      opposite: true,
      labels: {
        enabled: false,
        overflow: 'justify'
      }
    }],
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Results',
        align: 'middle'
      },
      labels: {
        overflow: 'justify'
      },
      tickInterval: 25
    },
    title: {
      text: null
    },
    series: series
  };

  $scope.postResult = function() {
    ExplorationService.createPostWithResults($scope.exploration).then(function() {
      $state.go('app.main.home');
    });
  };
}

module.exports = Big5Controller;
