(function() {

  'use strict';

  function multipleSelect($ionicModal) {
    return {
        restrict : 'E',

        // /* Our template */
        template: '<button class="button button-small button-light button-add-contact icon ion-person-add" ng-click="showItems($event)"></button>',

        /* Attributes to set */
        scope: {
            items        : '=', /* Items list is mandatory */
            callback     : '&'
        },

        link: function (scope, element, attrs) {
            /* Default values */
            scope.multiSelect   = attrs.multiSelect === 'true' ? true : false;
            scope.allowEmpty    = attrs.allowEmpty === 'false' ? false : true;

            /* Header used in ion-header-bar */
            scope.headerText    = attrs.headerText || '';

            /* Text displayed on label */
            // scope.text          = attrs.text || '';
            scope.defaultText   = scope.text || '';

            /* Notes in the right side of the label */
            scope.noteText      = attrs.noteText || '';
            scope.noteImg       = attrs.noteImg || '';
            scope.noteImgClass  = attrs.noteImgClass || '';

            /* Optionnal callback function */
            // scope.callback = attrs.callback || null;

            $ionicModal.fromTemplateUrl(
                'app/components/post/multi-select-modal.html',
                  {'scope': scope}
            ).then(function(modal) {
                scope.modal = modal;
            });

            /* Validate selection from header bar */
            scope.validate = function (event) {
              var _resultArray = [];
                // Construct selected values and selected text
                if (scope.multiSelect == true) {

                    _resultArray = [];


                    // Loop on items
                    jQuery.each(scope.items, function (index, item) {
                        if (item.checked) {
                          _resultArray.push(item);
                          item.checked = false;
                        }
                    });
                }

                // Select first value if not nullable
                // if (typeof scope.value == 'undefined' || scope.value == '' || scope.value == null ) {
                //     if (scope.allowEmpty == false) {
                //         scope.value = scope.items[0].id;
                //         scope.text = scope.items[0].text;
                //
                //         // Check for multi select
                //         scope.items[0].checked = true;
                //     } else {
                //         scope.text = scope.defaultText;
                //     }
                // }

                // Hide modal
                scope.hideItems();

                // Execute callback function
                if (typeof scope.callback == 'function') {
                  scope.callback()(_resultArray);
                }
            }

            /* Show list */
            scope.showItems = function (event) {
                event.preventDefault();
                scope.modal.show();
            }

            /* Hide list */
            scope.hideItems = function () {
                scope.modal.hide();
            }

            /* Destroy modal */
            scope.$on('$destroy', function() {
              scope.modal.remove();
            });
        }
    }
  }

  module.exports = ['$ionicModal', multipleSelect];

}());
