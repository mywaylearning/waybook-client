/* globals filepicker */
function PostFormController($scope, $state, $timeout, PostService, TagService, ContactService) {
  'ngInject';
  var ctrl = this;

  var originalPost;

  var yesterday = new Date();

  // Parse content to detect tags
  var detectTags = function(text) {
    var tags = text.match(/(^|\W)(#[a-z\d][\w-]*)/ig);
    var _tags = [];
    if (tags) {
      angular.forEach(tags, function(tag) {
        _tags.push(tag.substr(tag.indexOf('#') + 1));
      });
    }

    return _tags;
  };

  yesterday.setDate(yesterday.getDate() - 1);

  // Datepicker configurations
  ctrl.startDateConfig = {
    titleLabel: 'Date you are planning to start this goal',
    from: yesterday,
    callback: function(val) {
      if (val) {
        ctrl.model.gStartDate = val;
      }
    }
  };

  ctrl.deadlineDateConfig = {
    titleLabel: 'Date you are planning to finish this goal',
    showTodayButton: false,
    from: new Date(),
    callback: function(val) {
      if (val) {
        ctrl.model.gEndDate = val;
      }
    }
  };

  // Hold selectec contacts to share
  ctrl.selectedContacts = [];

  // Check if it's updating a post
  if (ctrl.post) {
    originalPost = angular.copy(ctrl.post);
    // Prepare dates first
    if (ctrl.post.postType === 'goal') {
      ctrl.post.gStartDate = new Date(ctrl.post.gStartDate);
      ctrl.post.gEndDate = new Date(ctrl.post.gEndDate);
    }

    ctrl.model = ctrl.post;
  } else {
    ctrl.model = {
      postType: ctrl.postType
    };
  }

  if (ctrl.sharedPost) {
    ctrl.model.sharedFrom = ctrl.sharedPost.id;
  }

  // Handle content editable click based on type of post
  ctrl.goToGoal = function() {
    if (ctrl.sharedPost) {
      return;
    }
    $state.go('app.main.type', {
      type: 'goal'
    });
  };

  if (ctrl.deadline) {
    ctrl.deadlineDateConfig.inputDate = ctrl.deadline;
    ctrl.model.gEndDate = ctrl.deadline;
  }

  if (ctrl.tags) {
    angular.forEach(ctrl.tags, function(tag) {
      ctrl.model.content = '#' + tag + ' ';
    });
  }

  // Define default options based on type of post
  switch (ctrl.model.postType) {
  case 'thought':
    ctrl.placeHolder = "What's on your mind?";
    break;
  case 'goal':
    // Define default properties of goal
    if (!ctrl.post) {
      ctrl.model.gImportance = 'Should Complete';
      ctrl.model.occurrences = 1;
      ctrl.model.gRecurringEnabled = false;
      ctrl.model.gRecurringRecurrence = 'Daily';
    }
    ctrl.placeHolder = 'What do you seek to accomplish in life? Set a goal that\'s measurable and achievable.';
    break;
  case 'discovery':
    ctrl.placeHolder = 'What do you know about yourself?';
    break;
  case 'resource':
    ctrl.placeHolder = 'What resources will help you or others be successful?';
    ctrl.addLink = true;
    break;
  default:
    ctrl.placeHolder = 'What do you seek to accomplish in life?';
  }

  // Search for tags on API based on user input
  ctrl.searchTag = function(term) {
    if (!term.length) {
      return;
    }
    return TagService.collection(term).then(function(response) {
      var count = 0;
      ctrl.tagsView = [];
      angular.forEach(response, function(tag) {
        if (count > 10) {
          return;
        }
        if (tag.text) {
          ctrl.tagsView.push(tag);
          count++;
        }
      });
    });
  };

  // Add tag to textarea with the #
  ctrl.getTagText = function(item) {
    return '#' + item.text;
  };

  // Validates each item added as contact to share. If there's no ID, it's an e-mail and we must validade it.
  ctrl.validateContact = function($tag) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    var valid = re.test($tag.email);
    if (!$tag.id) {
      $scope.invalidContact = !valid;
      return valid;
    }

    $scope.invalidContact = false;
    return true;
  };


  ctrl.addContacts = function(contacts) {
    if (contacts && contacts.length) {
      angular.forEach(contacts, function(contact) {
        var exist = false;
        angular.forEach(ctrl.selectedContacts, function(selectedContact) {
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

  ctrl.allContacts = ContactService.all().$object;

  ctrl.loadContacts = function($query) {
    return ContactService.all().then(function(contacts) {
      return contacts.filter(function(contact) {
        var _ret = false;

        if (contact.firstName && contact.firstName.toLowerCase().indexOf($query.toLowerCase()) !== -1) {
          _ret = true;
        }

        if (contact.lastName && contact.lastName.toLowerCase().indexOf($query.toLowerCase()) !== -1) {
          _ret = true;
        }

        if (contact.email.toLowerCase().indexOf($query.toLowerCase()) !== -1) {
          _ret = true;
        }

        return _ret;
      });
    });
  };

  ctrl.attachPhotos = function() {
    filepicker.pick({
      mimetype: 'image/*',
      services: ['IMAGE_SEARCH', 'COMPUTER', 'WEBCAM', 'FACEBOOK', 'INSTAGRAM', 'FLICKR', 'DROPBOX'],
      openTo: 'IMAGE_SEARCH'
    },
    function(Blob) {
      ctrl.model.image = Blob.url;
      $scope.$apply();
    },
    function() {
      $scope.$apply();
    });
  };

  ctrl.attachFiles = function() {
    filepicker.pickMultiple({
      extensions: ['.pdf', '.doc', '.txt', '.docx'],
      services: ['COMPUTER', 'DROPBOX', 'GMAIL', 'GOOGLE_DRIVE'],
      maxFiles: 3
    },
    function(Blobs) {
      ctrl.model.files = Blobs;
      $scope.$apply();
    },
    function() {
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
    PostService.extractLink(ctrl.linkExtraction.url).then(function(result) {
      var image;
      var imageType;
      var imageLandscape = false;
      var _image;

      ctrl.linkExtraction.started = false;
      ctrl.linkExtraction.url = '';

      if (result.images.length) {
        _image = result.images[0];
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
    },
    function() {
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
    delete ctrl.model.image;
  };

  ctrl.cancelPost = function() {
    if ($scope.hasCallbackOnCancel()) {
      if (angular.isFunction(ctrl.onCancel())) {
        return ctrl.onCancel()();
      }
    }

    if (ctrl.sharedPost || $state.current.name === 'app.plan') {
      ctrl.modalInstance.hide();
    } else if (!ctrl.model.id) {
      $state.go('app.main.home');
    } else {
      ctrl.post.editMode = false;
      ctrl.post = originalPost;
    }
  };

  ctrl.save = function(form) {
    if (form.$invalid) {
      return;
    }

    $timeout(function() {
      if ($scope.invalidContact) {
        return;
      }

      if (ctrl.linkExtraction.started) {
        return;
      }

      $scope.saving = true;

      ctrl.model.share = [];

      angular.forEach(ctrl.selectedContacts, function(contact) {
        var _contact = contact.id ? contact.plain() : contact;
        ctrl.model.share.push(_contact);
      });

      ctrl.model.systemTags = [];
      ctrl.model.tags = [];

      // define tags
      if (ctrl.model.content) {
        ctrl.model.tags = detectTags(ctrl.model.content);
      }

      // Append the post type to systemTags
      ctrl.model.systemTags.push(ctrl.model.postType);

      // Add tag habit if it's one
      if (ctrl.model.gRecurringEnabled) {
        ctrl.model.systemTags.push('habit');
      }

      if (!ctrl.model.id) {
        PostService.create(ctrl.model).then(function(result) {
          PostService.getById(result.id).then(function(newPost) {
            if ($scope.hasCallbackOnCreate()) {
              if (angular.isFunction(ctrl.onCreate())) {
                return ctrl.onCreate()(newPost);
              }
            }

            if (ctrl.sharedPost) {
              ctrl.modalInstance.hide();
            }
            newPost.justEdited = true;
            // ctrl.posts.push(newPost);
            $state.go('app.main.home');
          });
        });
      } else {
        ctrl.model.save().then(function() {
          ctrl.post.editMode = false;
          ctrl.post.justEdited = true;
        });
      }
    }, 10);
  };
}

module.exports = PostFormController;
