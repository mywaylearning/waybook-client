(function() {
  'use strict';

  var debug = require('debug')('waybook:GoalService');

  function CommentService(api, EVENTS, API_URL) {

    var svcInterface, Comments;

    Comments = api.all('comments');

    /**
     * Public
     */
    svcInterface = {
      create: _create
    };
    return svcInterface;

    /**
     * Private
     */
    function _create(newComment) {
      return Comments.post(newComment);
    }
  }

  module.exports = ['api', 'EVENTS', 'API_URL', CommentService];

}());
