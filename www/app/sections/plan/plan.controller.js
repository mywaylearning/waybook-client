(function() {

  'use strict';

  var debug = require('debug')('waybook:PlanController');

  function PlanController($scope, $state) {
    debug('here we are');

    console.log($state.current);

  }

  module.exports = ['$scope', '$state', PlanController];

}());
