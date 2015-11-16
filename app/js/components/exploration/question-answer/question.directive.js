function ExplorationQuestionDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/question-answer/question.html',
    controller: 'ExplorationQuestionQAController',
    scope: {
      exploration: '=',
      question: '=',
      onAnswer: '&'
    }
  };
}

module.exports = ExplorationQuestionDirective;
