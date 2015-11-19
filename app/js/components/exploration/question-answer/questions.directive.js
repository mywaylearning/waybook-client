function ExplorationQuestionsDirective() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/question-answer/questions.html',
    controller: 'ExplorationQuestionsQAController',
    scope: {
      exploration: '='
    }
  };
}

module.exports = ExplorationQuestionsDirective;
