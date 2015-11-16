function wayFeed() {
  return {
    restrict: 'EA',
    scope: {
      posts: '=',
      postType: '@type',
      user: '='
    },
    controller: 'FeedController',
    templateUrl: 'components/feed/feed.html'
  };
}

module.exports = wayFeed;
