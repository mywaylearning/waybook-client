function UniteDetailController($scope, $state, $q, $timeout, $stateParams, $ionicPopup, contact, $ionicHistory, ContactService, TagService) {
  'ngInject';
  var baseVoice = {
    number: ''
  };

  var afterSave = function() {
    if (angular.isFunction($stateParams.onCreate)) {
      return $stateParams.onCreate();
    }
    $state.go('app.unite', {}, {
      reload: true
    });
  };

  if ($state.current.name === 'app.unite.add') {
    $scope.helpHtml = 'sections/unite/help-add.html';
  }

  $scope.viewData = {
    title: 'Add a supporter',
    editMode: false
  };

  $scope.contact = {};

  if ($stateParams.tags) {
    $scope.contact.tags = $stateParams.tags;
  }

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.voice1 = $scope.voice2 = {};

  // Editing mode
  if (contact) {
    $scope.viewData.title = 'Editing: ' + contact.firstName + ' ' + contact.lastName;
    $scope.viewData.editMode = true;

    $scope.contact = contact;
  }

  if (!$scope.contact.voice) {
    $scope.contact.voice = [angular.copy(baseVoice), angular.copy(baseVoice)];
  }

  $scope.loadTags = function(query) {
    var deferred = $q.defer();
    var tags = [];

    TagService.collection(query).then(function(response) {
      angular.forEach(response, function(tag) {
        if (tag.text) {
          tags.push(tag.text);
        }
      });

      deferred.resolve(tags);
    });

    return deferred.promise;
  };

  $scope.saveContact = function() {
    $timeout(function() {
      if (contact.id) {
        $scope.contact.save().then(function() {
          afterSave();
        });
      } else {
        ContactService.create($scope.contact).then(function() {
          afterSave();
        }).catch(function(err) {
          $ionicPopup.alert({
            title: err.name,
            template: err.message
          });
        });
      }
    }, 10);
  };

  $scope.cancel = function() {
    if (angular.isFunction($stateParams.onCancel)) {
      return $stateParams.onCancel();
    }

    $state.go('^');
  };
}

module.exports = UniteDetailController;
