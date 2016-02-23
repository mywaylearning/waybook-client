function linkPreview() {
  return {
    restrict: 'E',
    scope: {
      link: '='
    },
    templateUrl: 'components/common/linkPreview.html',
    controller: function($scope) {
      'ngInject';
      $scope.openExternalUrl = function(url) {
        window.open(url, '_blank');
      };
    }
  };
}

module.exports = linkPreview;
