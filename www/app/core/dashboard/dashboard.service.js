(function() {
  'use strict';

  function DashboardService(api) {

    var svcInterface, Dashboard;

    Dashboard = api.one('dashboard');

    /**
     * Public
     */
    svcInterface = {
      get: _get
    };

    return svcInterface;

    /**
     * Private
     */
     function _get() {
       return Dashboard.get();
     }
  }

  module.exports = ['api', DashboardService];

}());
