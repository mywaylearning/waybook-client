'use strict';

function UniteDetailController($scope, $state, $q, contact, $ionicHistory, ContactService, TagService) {

  var baseVoice = {
    number: ''
  };

  var afterSave = function() {
    $state.go('app.unite', {}, {reload: true});
  };

  $scope.viewData = {
    title: 'Add a supporter',
    editMode: false
  };

  $scope.contact = {};
  $scope.tags = [];

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.voice1 = $scope.voice2 = {};

  // Editing mode
  if (contact) {
    $scope.viewData.title = 'Editing: ' + contact.firstName + ' ' + contact.lastName;
    $scope.viewData.editMode = true;

    $scope.contact = contact;
    $scope.tags = contact.tags;
  }

  if (!$scope.contact.voice) {
    $scope.contact.voice = [angular.copy(baseVoice), angular.copy(baseVoice)];
  }

  $scope.loadTags = function(query) {
    var deferred = $q.defer(),
        tags = [];

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
    if (contact.id) {
      console.log($scope.contact);
      $scope.contact.save().then(function(result) {
        afterSave();
      });
    } else {
      var _tags = [];
      // Check tags
      if ($scope.tags.length) {
        angular.forEach($scope.tags, function(tag) {
          _tags.push(tag.text.replace('#', ''));
        });
      }
      $scope.contact.tags = _tags;

      ContactService.create($scope.contact).then(function(result){
        afterSave();
      });
    }
  };
}

UniteDetailController.$inject = ['$scope', '$state', '$q', 'contact', '$ionicHistory', 'ContactService', 'TagService'];

module.exports = UniteDetailController;
