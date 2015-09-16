(function() {

  'use strict';

  var debug = require('debug')('waybook:ExplorationController');

  function ExplorationController($scope, $stateParams, questions) {
    debug('here we are');
    debug($stateParams);

    $scope.questions = questions;

    $scope.expData = {};

    $scope.$on('wizard:StepFailed', function(e, args) {
      // handle error
    });

  }

  module.exports = ['$scope', '$stateParams', 'questions', ExplorationController];

}());
