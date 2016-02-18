function ReportService(api) {
  'ngInject';
  var svcInterface;
  var Report = api.one('reporting');

  /**
   * Private
   */
  function _collection() {
    return Report.customGET();
  }

  /**
   * Public
   */
  svcInterface = {
    collection: _collection
  };
  return svcInterface;
}

module.exports = ReportService;
