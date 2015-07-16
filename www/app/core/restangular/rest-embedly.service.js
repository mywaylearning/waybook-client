'use strict';


/**
 * Create a new Restangualr service with custom config
 * for api calls that require an access_token.
 * @param {service} Restangular
 * @param {service} authStore
 * @param {constant} API_URL
 * @return {service}
 */
function RestangularEmbedLy(Restangular, EMBEDLY_CONFIG) {
  var service;

  service = Restangular.withConfig(restangularConfig);

  // TODO: May want to look at baking in an abort function
  // var abort = $q.defer();
  // Restangular.one('foos', 12345).withHttpConfig({timeout: abort.promise}).get();
  // abort.resolve();

  return service;

  function restangularConfig(RestangularConfigurer) {
    /**
     *  Set api base url
     */
    RestangularConfigurer.setBaseUrl(EMBEDLY_CONFIG.url);
    RestangularConfigurer.setDefaultRequestParams('get', {key: EMBEDLY_CONFIG.key});
  }
}

module.exports = ['Restangular', 'EMBEDLY_CONFIG', RestangularEmbedLy];
