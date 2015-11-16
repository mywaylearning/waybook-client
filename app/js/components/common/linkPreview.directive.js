function linkPreview() {
  return {
    restrict: 'E',
    scope: {
      link: '='
    },
    templateUrl: 'components/common/linkPreview.html'
  };
}

module.exports = linkPreview;
