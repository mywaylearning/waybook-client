(function() {

  'use strict';

  function wayFeed() {

    return {
      restrict: 'EA',
      scope: {
        posts: '=',
        postType: '@type',
        user: '='
      },
      controller: 'FeedController',
      templateUrl: '/app/components/feed/feed.html'
    };
  }

  module.exports = wayFeed;

}());
