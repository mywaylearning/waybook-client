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

  app.controller('ExplorationQuestionsMultipleChoiceController', require('./exploration/multiple-choice/questions.controller.js'));
  app.directive('wayExplorationQuestionsMultipleChoice', require('./exploration/multiple-choice/questions.directive.js'));

  app.controller('ExplorationQuestionMultipleChoiceController', require('./exploration/multiple-choice/question.controller.js'));
  app.directive('wayExplorationQuestionMultipleChoice', require('./exploration/multiple-choice/question.directive.js'));

  app.controller('ExplorationQuestionsHeatMapController', require('./exploration/heat-map/questions.controller.js'));
  app.directive('wayExplorationQuestionsHeatMap', require('./exploration/heat-map/questions.directive.js'));

  app.controller('ExplorationQuestionHeatMapController', require('./exploration/heat-map/question.controller.js'));
  app.directive('wayExplorationQuestionHeatMap', require('./exploration/heat-map/question.directive.js'));


  app.directive('linkPreview', require('./common/linkPreview.directive.js'));


  app.controller('FeedController', require('./feed/feed.controller.js'));
  app.directive('wayFeed', require('./feed/feed.directive.js'));


  app.controller('CommentController', require('./comment/comment.controller.js'));
  app.directive('wayComment', require('./comment/comment.directive.js'));

}());
