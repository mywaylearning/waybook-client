(function() {

  'use strict';

  var debug = require('debug')('waybook:ExplorationController');

  function ExplorationController($scope, exploration) {
    debug('here we are');

    $scope.viewData = {
      exploration: exploration
    };

  }

  module.exports = ['$scope', 'exploration', ExplorationController];

}());
