(function() {

  'use strict';

  var app = angular.module('waybook');

  app.controller('PostController', require('./post/post.controller.js'));
  app.directive('wayPost', require('./post/post.directive.js'));
  app.directive('contenteditable', require('./post/contenteditable.directive.js'));
  app.directive('linkPreview', require('./shared/linkPreview.directive.js'));
  app.directive('multipleSelectModal', require('./post/multiple-select.directive.js'));

  app.controller('FeedController', require('./feed/feed.controller.js'));
  app.directive('wayFeed', require('./feed/feed.directive.js'));
  app.directive('readMore', require('./feed/readMore.directive.js'));

  app.controller('CommentController', require('./comment/comment.controller.js'));
  app.directive('wayComment', require('./comment/comment.directive.js'));

}());
