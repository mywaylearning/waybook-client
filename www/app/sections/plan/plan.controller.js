(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state, posts, tags) {
    $scope.tags = tags;
    $scope.timeline = posts[0].plain();
  }

  module.exports = ['$scope', '$state', 'posts', 'tags', PlanController];

}());
