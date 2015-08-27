(function() {

  'use strict';

  var app = angular.module('waybook');

  app.controller('PostFormController', require('./post/form/postForm.controller.js'));
  app.directive('wayPostForm', require('./post/form/postForm.directive.js'));
  app.directive('contenteditable', require('./post/form/contenteditable.directive.js'));
  app.directive('multipleSelectModal', require('./post/form/multiple-select.directive.js'));

  app.controller('PostViewController', require('./post/view/postView.controller.js'));
  app.directive('wayPostView', require('./post/view/postView.directive.js'));
  app.directive('readMore', require('./post/view/readMore.directive.js'));


  app.directive('linkPreview', require('./shared/linkPreview.directive.js'));


  app.controller('FeedController', require('./feed/feed.controller.js'));
  app.directive('wayFeed', require('./feed/feed.directive.js'));


  app.controller('CommentController', require('./comment/comment.controller.js'));
  app.directive('wayComment', require('./comment/comment.directive.js'));

}());
