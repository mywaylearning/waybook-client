function ExplorationQuestionController($scope, ExplorationService) {
  'ngInject';
  $scope.viewData = {
    question: $scope.question,
    error: null
  };


  $scope.model = {
    id: $scope.exploration.id,
    question: $scope.question.order,
    answer: ''
  };

  if ($scope.question.answer) {
    $scope.model.answer = $scope.question.answer;
  }

  $scope.saveAnswer = function() {
    ExplorationService.answerExplorationQuestion($scope.model).then(function() {
      $scope.viewData.error = null;
      $scope.onAnswer();
    }).catch(function() {
      $scope.viewData.error = 'We couldn\'t save your answer. Please try again.';
    });
  };
}

module.exports = ExplorationQuestionController;
