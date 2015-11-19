function IntroController($scope, $state, $ionicSlideBoxDelegate) {
  'ngInject';

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };

  $scope.goToSlide = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  };
}

module.exports = IntroController;
