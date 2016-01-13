function PostViewController($scope, $state, $timeout, PostService, $ionicPopover, $ionicPopup, $ionicModal) {
  'ngInject';
  var _userIsOwner = $scope.user.id === $scope.post.userId;
  $scope.state = $state.current;

  $scope.posts = $scope.$parent.$parent.posts;

  $scope.showPopoverActions = function($event) {
    $ionicPopover.fromTemplateUrl('components/post/view/post-view-actions.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popoverActions = popover;
      $scope.popoverActions.show($event);
    });
  };


  $scope.showPopoverStatus = function($event) {
    $ionicPopover.fromTemplateUrl('components/post/view/post-view-status.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popoverStatus = popover;
      $scope.popoverStatus.show($event);
    });
  };

  $scope.habitCalendarConfig = {
    titleLabel: _userIsOwner ? 'Track the days when you completed this habit' : 'Days that ' + $scope.post.WaybookUser.firstName + ' completed this habit',
    showTodayButton: false,
    showSetButton: false,
    closeLabel: _userIsOwner ? 'Done' : 'Close',
    inputDate: $scope.post.habitDates,
    to: new Date(),
    readOnly: !_userIsOwner,
    selectMultipleDates: true,
    callbackOnDateClick: function(val) {
      if (val) {
        $scope.post.habitDates = val;
        $scope.post.save();
      }
    }
  };


  $scope.editStatus = function(post, status) {
    var previousStatus = $scope.post.gStatus;
    $scope.popoverStatus.hide();
    $scope.post.gStatus = status;
    $scope.post.save().then(function() {

    }, function() {
      $scope.post.gStatus = previousStatus;
    });
  };

  $scope.deletePost = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete post',
      template: 'Are you sure you want to delete this post?'
    });
    $scope.popoverActions.hide();

    confirmPopup.then(function(res) {
      if (res) {
        $scope.post.remove().then(function() {
          var posts = $scope.$parent.$parent.posts;
          var index;

          // Check if it's child of items repeat
          if (posts) {
            index = posts.indexOf($scope.post);
            if (index > -1) {
              posts.splice(index, 1);
            }
          } else {
            // if not, redirect to main feed
            $state.go('app.main.home', {}, {
              reload: true
            });
          }
        });
      }
    });
  };

  $scope.editPost = function() {
    $scope.popoverActions.hide();
    $scope.post.editMode = true;
    $scope.post.justEdited = false;
  };

  $scope.shareInfo = function() {
    $scope.popoverActions.hide();
    $scope.shareInfoPopup = {};
    PostService.getById($scope.post.id, true).then(function(shared) {
      $ionicModal.fromTemplateUrl('components/post/view/share-info.html', {
        scope: $scope
      }).then(function(popup) {
        $scope.shareInfoPopup = popup;
        if ($scope.user.id === $scope.post.userId) {
          $scope.post.shared = shared;
        }
        $scope.shareInfoPopup.show();
      });
    });
  };

  $scope.reshare = function(post, $event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    $scope.sharingPost = angular.copy(post) || angular.copy($scope.post);

    if ($scope.sharingPost.originalShared) {
      delete $scope.sharingPost.originalShared;
    }

    $scope.postType = 'thought';
    $scope.resharePopup = {};
    $ionicModal.fromTemplateUrl('components/post/view/re-share.html', {
      scope: $scope
    }).then(function(popup) {
      $scope.resharePopup = popup;
      $scope.resharePopup.show();
    });
  };

  // Cleanup the popovers when we're done with it!
  $scope.$on('$destroy', function() {
    if ($scope.popoverActions) {
      $scope.popoverActions.remove();
    }

    if ($scope.popoverStatus) {
      $scope.popoverStatus.remove();
    }
  });
}

module.exports = PostViewController;
