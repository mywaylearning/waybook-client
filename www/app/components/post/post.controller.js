(function() {

  'use strict';

  var debug = require('debug')('waybook:PostController');

  function PostController($scope, $state, $http, $q, $ionicModal, router, goal, SWAGGER, PostService, TagService) {
    debug('here we are (directive controller)');

    debug(SWAGGER);

    var ctrl = this;

    // Handle content editable click based on type of post
    ctrl.goToThought = function() {
      $state.go('app.main.thought');
    };


    // Define default options based on type of post
    switch (ctrl.postType) {
      case 'thought':
        ctrl.placeHolder = "This is the default text for a thought..."
        break;
      case 'goal':
        ctrl.placeHolder = "#goal<br>What do you seek to accomplish? Is it measurable?"
        break;
      case 'discovery':
        ctrl.placeHolder = "#discovery<br>What did you learn about yourself, or how you engage with others and the world around you?"
        break;
      case 'resource':
        ctrl.placeHolder = "#resource<br>What will help you or others be successful? A resource can be a service, website, book, video, article, event, person, or something else. It’s most helpful if they are identified by a URL so they are easy to access."
        ctrl.addLink = true;
        break;
      default:
        ctrl.placeHolder = "Share something...";
    }

    // Mocking contacts. TODO: Use API endpoint.
    $http.get('app/components/post/test.json').success(function(result) {
      ctrl.allContacts = result;
    });


    // Parse content to detect tags
    var detectTags = function(text) {
      var tags = text.match(/(^|\W)(#[a-z\d][\w-]*)/ig);
      var _tags = []
      if (tags) {
        angular.forEach(tags, function(tag) {
          _tags.push(tag.substr(tag.indexOf('#') + 1));
        });
      }

      return _tags;
    };

    // Search for tags on API based on user input
    ctrl.searchTag = function(term) {
      if (!term.length) {
        return;
      }
      return TagService.collection(term).then(function(response) {
        var count = 0;
        ctrl.tagsView = [];
        angular.forEach(response, function(tag){
          if (count > 10) {
            return;
          }
          if (tag.text) {
            ctrl.tagsView.push(tag);
            count++;
          }
        })
      });
    };

    // Add tag to div contenteditable with the #
    ctrl.getTagText = function(item) {
        return '<span>#' + item.text + '</span>';
    };

    // Validates each item added as contact to share. If there's no ID, it's an e-mail and we must validade it.
    ctrl.validateContact = function($tag) {
      if (!$tag.id) {
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
      if (!ctrl.model.id) {
        debug('saving...', ctrl.model);
        // define tags
        ctrl.model.tags = detectTags(ctrl.model.content);

        // Append the post type to tags
        ctrl.model.tags.push(ctrl.postType);
        goal.create(ctrl.model).then(function(result){
          ctrl.reset();
          $state.go('app.main', {}, {reload: true});
        });
      }
    };

  }

  module.exports = ['$scope', '$state', '$http', '$q', '$ionicModal', 'router', 'goal', 'SWAGGER', 'PostService', 'TagService', PostController];

}());
