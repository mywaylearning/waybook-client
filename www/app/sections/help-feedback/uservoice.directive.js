(function() {
  'use strict';

  function UserVoiceDirective() {
    return {
      restrict: 'A',
      link: function(scope, el, attrs) {
        UserVoice.push(['embed', el[0], {
          mode: 'smartvote',
          height: '325px',
          width: '100%'
        }]);
      }
    }
  }

  module.exports = UserVoiceDirective;
}());
