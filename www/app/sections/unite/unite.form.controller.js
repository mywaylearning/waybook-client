'use strict';

function UniteDetailController($scope, $state, $q, $timeout, contact, $ionicHistory, ContactService, TagService) {

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
    $timeout(function() {
      if (contact.id) {
        $scope.contact.save().then(function(result) {
          afterSave();
        });
      } else {
        ContactService.create($scope.contact).then(function(result){
          afterSave();
        });
      }
    }, 10)
  };
}

UniteDetailController.$inject = ['$scope', '$state', '$q', '$timeout', 'contact', '$ionicHistory', 'ContactService', 'TagService'];

module.exports = UniteDetailController;
