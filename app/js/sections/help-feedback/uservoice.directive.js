/* globals UserVoice */
function UserVoiceDirective() {
  return {
    restrict: 'A',
    link: function(scope, el) {
      UserVoice.push(['embed', el[0], {
        mode: 'smartvote',
        height: '325px',
        width: '100%'
      }]);
    }
  };
}

module.exports = UserVoiceDirective;
