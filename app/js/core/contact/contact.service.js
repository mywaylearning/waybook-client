function ContactService(api) {
  'ngInject';
  var svcInterface;
  var Contacts = api.all('contacts');

  /**
   * Private
   */
  function _all() {
    return Contacts.getList();
  }

  function _create(contact) {
    return Contacts.post(contact);
  }

  function _getById(id) {
    return api.one('contacts', id).get();
  }

  /**
   * Public
   */
  svcInterface = {
    all: _all,
    create: _create,
    getById: _getById
  };
  return svcInterface;
}

module.exports = ContactService;
