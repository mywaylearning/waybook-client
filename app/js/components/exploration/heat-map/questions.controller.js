/* eslint no-nested-ternary:0 */
function ExplorationQuestionsController($scope, $state, ExplorationService) {
  'ngInject';
  angular.forEach($scope.exploration.questions, function(question) {
    question.order = parseInt(question.order, 10);
  });

  $scope.postResult = function() {
    ExplorationService.createPostWithResults($scope.exploration).then(function() {
      $state.go('app.main.home');
    });
  };

  $scope.exploration.answers.sort(function(a, b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} );
}

module.exports = ExplorationQuestionsController;
