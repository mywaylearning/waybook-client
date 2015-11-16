/**
 * Create a new Restangualr service with custom config
 * for api calls that require an access_token.
 * @param {service} Restangular
 * @param {service} authStore
 * @param {constant} API_URL
 * @return {service}
 */
function RestangularApi(Restangular, auth, authStore, API_URL) {
  'ngInject';

  var service;

  function restangularConfig(RestangularConfigurer) {
    /**
     *  Set api base url
     */
    RestangularConfigurer.setBaseUrl(API_URL);
  }

  service = Restangular.withConfig(restangularConfig);

  // TODO: May want to look at baking in an abort function
  // var abort = $q.defer();
  // Restangular.one('foos', 12345).withHttpConfig({timeout: abort.promise}).get();
  // abort.resolve();

  // add the access token header to all requests
  service.addFullRequestInterceptor(function() {
    return {
      headers: auth.getAuthHeader()
    };
  });

  return service;
}

module.exports = RestangularApi;
