function ExplorationQuestionController($scope, ExplorationService) {
  'ngInject';
  $scope.viewData = {
    question: angular.copy($scope.question),
    minimumWords: false,
    error: null
  };

  $scope.saved = false;

  if ($scope.exploration.slug === 'personality-watson') {
    $scope.viewData.minimumWords = 3500;
  }

  $scope.displayResultButton = function() {
    var display = false;
    var countAnswerWords = $scope.model.answer ? $scope.model.answer.split(/\s+/).length : 0;
    var countSavedAnswerWords = $scope.question.answer ? $scope.question.answer.split(/\s+/).length : 0;
    if ($scope.exploration.slug === 'personality-watson') {
      if ((countAnswerWords >= $scope.viewData.minimumWords && $scope.saved) || (countSavedAnswerWords >= $scope.viewData.minimumWords && !$scope.saved)) {
        display = true;
      }
    }

    return display;
  };

  $scope.displayWordCount = function() {
    if (!$scope.viewData.minimumWords) {
      return false;
    }

    return $scope.model.answer ? $scope.model.answer.split(/\s+/).length : '0';
  };


  $scope.model = {
    id: $scope.exploration.id,
    question: $scope.question.order,
    answer: ''
  };

  if ($scope.question.answer) {
    $scope.model.answer = $scope.question.answer;
    $scope.onComplete()($scope.question.order);
  }

  $scope.saveAnswer = function() {
    ExplorationService.answerExplorationQuestion($scope.model).then(function() {
      $scope.saved = true;
      $scope.viewData.error = null;
      $scope.onAnswer();
      $scope.onComplete()($scope.question.order);
    }).catch(function() {
      $scope.saved = false;
      $scope.viewData.error = 'We couldn\'t save your answer. Please try again.';
    });
  };
}

module.exports = ExplorationQuestionController;
