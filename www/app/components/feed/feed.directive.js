(function() {

  'use strict';

  function wayFeed() {

    return {
      restrict: 'EA',
      controller: 'FeedController',
      templateUrl: '/app/components/feed/feed.html'
    };
  }

  module.exports = wayFeed;

}());
