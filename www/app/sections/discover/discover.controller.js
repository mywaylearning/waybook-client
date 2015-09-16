(function() {

  'use strict';

  var debug = require('debug')('waybook:DiscoveryController');

  function DiscoveryController($scope, categories) {
    debug('here we are');

    $scope.viewData = {
      categories: categories
    };

  }

  module.exports = ['$scope', 'categories', DiscoveryController];

}());
