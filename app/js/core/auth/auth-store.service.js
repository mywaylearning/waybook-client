function AuthStoreService(store, LOCAL_STORAGE_KEYS) {
  'ngInject';
  var svcInterface;
  var key = LOCAL_STORAGE_KEYS.auth;

  /**
   * Private
   */
  function isStoreEmpty() {
    return angular.isUndefined(store.get(key));
  }

  function _save(data) {
    store.set(key, data);
  }

  function _getAccessToken() {
    if (isStoreEmpty()) {
      return undefined;
    }

    return store.get(key).access_token;
  }

  function _getRefreshToken() {
    if (isStoreEmpty()) {
      return undefined;
    }

    return store.get(key).refresh_token;
  }

  function _destroy() {
    store.remove(key);
  }

  /**
   * Public
   */
  svcInterface = {
    save: _save,
    destroy: _destroy,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken
  };
  return svcInterface;
}

module.exports = AuthStoreService;
