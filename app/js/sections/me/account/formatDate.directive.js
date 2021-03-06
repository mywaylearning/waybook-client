function formatDate($filter) {
  'ngInject';
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, el, attrs, ngModelController) {
      ngModelController.$formatters.push(function(data) {
        // Model -> View
        return $filter('date')(data, 'MM/dd/yyyy');
      });
    }
  };
}

module.exports = formatDate;
