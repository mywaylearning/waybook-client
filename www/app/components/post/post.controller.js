(function() {

  'use strict';

  var debug = require('debug')('waybook:PostController');

  function PostController($scope, $state, $http, $q, $ionicModal, router, goal, SWAGGER, PostService, TagService) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    console.log($scope);

    var ctrl = this;

    // Handle content editable click based on type of post
    ctrl.handleContentClick = function() {
      if (!ctrl.postType) {
        $state.go('app.main.thought');
      }
    };

    function init() {
      // Other definitions
      ctrl.placeHolder = "Share something...";

      debug('type...? ' + ctrl.postType);
    }
    init();

    // Mocking contacts
    $http.get('app/components/post/test.json').success(function(result) {
      ctrl.allContacts = result;
    });

    // Tags holder
    ctrl.tags = [];

    var detectTags = function(text) {
      var tags = text.match(/(^|\W)(#[a-z\d][\w-]*)/ig)
      var tagsArr = [];
      if (tags) {
        angular.forEach(tags, function(tag) {
          tagsArr.push(tag.replace('#', '').replace(' ', '').replace('>', '').replace(';', ''));
        })
      }

      return tagsArr;
    };



    ctrl.searchTag = function(term) {
      if (!term.length) {
        return;
      }
      return TagService.collection(term).then(function(response) {
        ctrl.tags = response;
      });
    };

    ctrl.getTagText = function(item) {
        return '<span>#' + item.text + '</span>';
    };

    ctrl.validateContact = function($tag) {
      if (!$tag.id) {
        // must validade if it's an e-mail
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($tag.name);
      }

      return true;
    };


    ctrl.addContacts = function(contacts) {
      if (contacts && contacts.length) {
        angular.forEach(contacts, function(contact) {
          var exist = false;
          angular.forEach(ctrl.selectedContacts, function(selectedContact){
            if (contact.id === selectedContact.id) {
              exist = true;
            }
          });
          if (!exist) {
            ctrl.selectedContacts.push(contact);
          }
        });
      }
    };

    ctrl.selectedContacts = [
      { id: 0, name: 'Self' }
    ];

    ctrl.loadContacts = function($query) {
      return $http.get('app/components/post/test.json', { cache: true}).then(function(response) {
        var contacts = response.data;
        return contacts.filter(function(contact) {
          return contact.name.toLowerCase().indexOf($query.toLowerCase()) != -1 || contact.email.toLowerCase().indexOf($query.toLowerCase()) != -1;
        });
      });
    };

    ctrl.attachPhotos = function() {
      filepicker.pick(
        {
          mimetype: 'image/*',
          services: ['IMAGE_SEARCH', 'COMPUTER', 'WEBCAM', 'FACEBOOK', 'INSTAGRAM', 'FLICKR', 'DROPBOX'],
          openTo: 'IMAGE_SEARCH'
        },
        function(Blob){
          ctrl.model.image = Blob.url;
          $scope.$apply();
        },
        function(FPError){
          $scope.$apply();
          console.log(FPError.toString());
        });
    };

    ctrl.attachFiles = function() {
      filepicker.pickMultiple(
        {
          extensions: ['.pdf', '.doc', '.txt', '.docx'],
          services: ['COMPUTER', 'DROPBOX', 'GMAIL', 'GOOGLE_DRIVE'],
          maxFiles: 3
        },
        function(Blobs){
          ctrl.model.files = Blobs;
          $scope.$apply();
        },
        function(FPError){
          $scope.$apply();
        });
    };

    ctrl.linkExtraction = {
      url: null
    };

    ctrl.extractLink = function() {
      var pattern = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      var regex = new RegExp(pattern);
      if (!ctrl.linkExtraction.url) {
        return;
      } else if (!regex.test(ctrl.linkExtraction.url)) {
        return;
      }

      ctrl.linkExtraction.started = true;
      PostService.extractLink(ctrl.linkExtraction.url).then(function(result){
        ctrl.linkExtraction.started = false;
        ctrl.linkExtraction.url = '';
        var image, imageType, imageLandscape = false;

        if (result.images.length) {
          var _image = result.images[0];
          image = _image.url;
          imageType = 'image';

          if ((_image.width / 1.1) > _image.height) {
            imageLandscape = true;
          }

        } else if (result.favicon_url) {
          image = result.favicon_url;
          imageType = 'icon';
        } else {
          image = false;
        }

        ctrl.model.link = {
          url: result.url,
          title: result.title,
          description: result.description,
          landscape: imageLandscape,
          imageType: imageType,
          image: image
        };

      }, function(err) {
        ctrl.linkExtraction.started = false;
        ctrl.linkExtraction.url = '';
        ctrl.linkExtraction.result = null;
      });
    };

    ctrl.removeLink = function() {
      ctrl.linkExtraction.result = null;
      delete ctrl.model.link;
    };


    ctrl.removePhoto = function() {
      ctrl.model.image = null;
    };

    ctrl.reset = function() {
      ctrl.model = {};
    };

    ctrl.reset();

    ctrl.save = function() {
      debug('saving...', ctrl.model);
      // define tags
      ctrl.model.tags = detectTags(ctrl.model.content);
      goal.create(ctrl.model).then(function(result){
        $state.reload();
      });
    };

  }

  module.exports = ['$scope', '$state', '$http', '$q', '$ionicModal', 'router', 'goal', 'SWAGGER', 'PostService', 'TagService', PostController];

}());
