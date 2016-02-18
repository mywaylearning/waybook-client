function contactItem() {
  return {
    restrict: 'AE',
    scope: {
      contact: '='
    },
    templateUrl: 'components/contact/contactItem.html'
  };
}

module.exports = contactItem;
