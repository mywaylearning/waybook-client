function DashboardService(api) {
  'ngInject';
  var svcInterface;
  var Dashboard = api.one('dashboard');

  /**
   * Private
   */
  function _get() {
    return Dashboard.get();
  }

  /**
   * Public
   */
  svcInterface = {
    get: _get
  };

  return svcInterface;
}

module.exports = DashboardService;
