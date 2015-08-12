(function() {

  'use strict';

  function wayFeed() {

    return {
      restrict: 'EA',
      scope: {
        type: '=',
        feed: '=?'
      },
      controller: 'FeedController',
      templateUrl: '/app/components/feed/feed.html'
    };
  }

  module.exports = wayFeed;

}());
