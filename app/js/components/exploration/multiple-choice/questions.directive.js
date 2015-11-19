function ExplorationQuestionsDirective() {
  return {
    restrict: 'E',
    templateUrl: '/components/exploration/multiple-choice/questions.html',
    controller: 'ExplorationQuestionsMultipleChoiceController',
    scope: {
      exploration: '='
    }
  };
}

module.exports = ExplorationQuestionsDirective;
