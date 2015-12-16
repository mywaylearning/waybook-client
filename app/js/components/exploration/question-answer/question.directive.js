function ExplorationQuestionDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/question-answer/question.html',
    controller: 'ExplorationQuestionQAController',
    scope: {
      exploration: '=',
      question: '=',
      onAnswer: '&',
      onComplete: '&'
    }
  };
}

module.exports = ExplorationQuestionDirective;
