function Big5Directive() {
  return {
    restrict: 'E',
    templateUrl: 'components/exploration/results/big5.html',
    controller: 'Big5Controller',
    scope: {
      results: '=',
      exploration: '=',
      fromPost: '='
    }
  };
}

module.exports = Big5Directive;
