/* eslint no-nested-ternary:0 */
function ExplorationQuestionsController($scope, $ionicSlideBoxDelegate) {
  'ngInject';

  $scope.slides = {
    index: 0,
    keepFirst: false,
    count: Object.keys($scope.exploration.questions).length
  };

  angular.forEach($scope.exploration.questions, function(question) {
    question.order = parseInt(question.order, 10);
  });

  $scope.exploration.questions.sort(function(a, b) {
    return a.order > b.order ? 1 : (b.order > a.order ? -1 : 0);
  });

  angular.forEach($scope.exploration.questions, function(question, index) {
    if (question.answer === '' && $scope.slides.index === 0 && !$scope.slides.keepFirst) {
      if (index === 0) {
        $scope.slides.keepFirst = true;
      }
      $scope.slides.index = index;
    }
  });

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.slideHasChanged = function(index) {
    $scope.slides.index = index;
  };
}

module.exports = ExplorationQuestionsController;
