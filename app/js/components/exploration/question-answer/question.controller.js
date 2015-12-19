function ExplorationQuestionController($scope, $state, ExplorationService) {
  'ngInject';
  $scope.viewData = {
    question: angular.copy($scope.question),
    minimumWords: false,
    error: null
  };

  if ($scope.exploration.slug === 'personality-watson') {
    $scope.viewData.minimumWords = 3500;
  }

  function countWords(text) {
    return text ? text.split(/\s+/).length : 0;
  }

  $scope.displayResult = function() {
    var display = false;
    var countAnswerWords = countWords($scope.model.answer);
    if ($scope.exploration.slug === 'personality-watson' && countAnswerWords >= $scope.viewData.minimumWords) {
      display = true;
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
      if ($scope.exploration.slug === 'personality-watson' && countWords($scope.model.answer) >= $scope.viewData.minimumWords) {
        $state.go('app.explore.exploration.results', { exploration: $scope.exploration.slug });
      }
      $scope.viewData.error = null;
      $scope.onAnswer();
      $scope.onComplete()($scope.question.order);
    }).catch(function() {
      $scope.viewData.error = 'We couldn\'t save your answer. Please try again.';
    });
  };
}

module.exports = ExplorationQuestionController;
