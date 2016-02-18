function CommitmentsController($scope, $state, $stateParams, posts, tags, PostService, $ionicLoading, $ionicHistory) {
  'ngInject';

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var todayDate = new Date();
  var date = monthNames[todayDate.getMonth()].toLowerCase() + '-' + todayDate.getFullYear();

  var onCreateGoal = function() {
    $state.go('app.plan');
    PostService.timelineByTag().then(function(response) {
      $scope.months = response[1].plain();
      $scope.posts = response[0].plain();
    });
  };

  $scope.scrollTo = date;

  $scope.hashMonth = function(_date) {
    return _date.toLowerCase().replace(' ', '-');
  };

  $scope.tags = tags;
  $scope.months = posts[1].plain();
  $scope.posts = posts[0].plain();
  $scope.selectedTag = $stateParams.tag;

  $scope.getPosts = function(_date) {
    return $scope.posts[_date];
  };

  $scope.setTag = function() {
    if ($stateParams.tag === $scope.selectedTag) {
      return;
    }

    // $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $ionicLoading.show({
      animation: 'fade-in',
      hideOnStateChange: true
    });

    $state.go('app.plan', { tag: $scope.selectedTag }, { reload: true });
  };

  $scope.createGoal = function(_date) {
    var tmp = _date.split(' ');
    var month = monthNames.indexOf(tmp[0]) + 1;
    var deadline = new Date(month + '/15/' + tmp[1]);

    $state.go('app.main.type', { type: 'goal', deadline: deadline, onCreate: onCreateGoal });
  };
}

module.exports = CommitmentsController;
