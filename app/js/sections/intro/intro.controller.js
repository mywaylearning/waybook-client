function IntroController($scope) {
  'ngInject';

  var swiper = {};

  $scope.sliderOptions = {
    initialSlide: 0,
    loop: true
  };

  $scope.$watch('slider', function(_swiper) {
    if (_swiper) {
      swiper = _swiper;
    }
  });

  $scope.next = function() {
    swiper.slideNext();
  };

  $scope.previous = function() {
    swiper.slidePrev();
  };
}

module.exports = IntroController;
