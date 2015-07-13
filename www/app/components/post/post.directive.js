(function() {

  'use strict';

  function wayPost() {

    return {
      restrict: 'EA',
      scope: {
        postType: '@type'
      },
      controller: 'PostController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/app/components/post/post.html',
      link: function(scope, el, attrs) {
        var placeholderEl = el.find('.textarea');
        var postTitle = el.find('.post-title');

        placeholderEl.bind('click', function(e) {
          postTitle.focus();
        });

      }
    };
  }

  module.exports = wayPost;

}());
