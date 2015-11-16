/* eslint no-nested-ternary:0 */
function ExplorationQuestionsController($scope) {
  'ngInject';
  angular.forEach($scope.exploration.questions, function(question) {
    question.order = parseInt(question.order, 10);
  });

  $scope.exploration.answers.sort(function(a, b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} );
}

module.exports = ExplorationQuestionsController;
