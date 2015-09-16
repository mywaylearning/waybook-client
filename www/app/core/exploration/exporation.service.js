(function() {
  'use strict';

  function ExplorationService($q, api, EVENTS) {
    var deferred = $q.defer();

    var questions = [
      {
        id: 1,
        question: 'I am talkative',
        answers: [
          {
            text: 'Strongly Disagree',
            value: 1,
          },
          {
            text: 'Disagree',
            value: 2
          },
          {
            text: 'Neutral',
            value: 3
          },
          {
            text: 'Agree',
            value: 4
          },
          {
            text: 'Strongly Agree',
            value: 5
          }
        ]
      },
      {
        id: 2,
        question: 'I tend to find fault with others',
        answers: [
          {
            text: 'Strongly Disagree',
            value: 1,
          },
          {
            text: 'Disagree',
            value: 2
          },
          {
            text: 'Neutral',
            value: 3
          },
          {
            text: 'Agree',
            value: 4
          },
          {
            text: 'Strongly Agree',
            value: 5
          }
        ]
      },
      {
        id: 3,
        question: 'I do a thorough job',
        answers: [
          {
            text: 'Strongly Disagree',
            value: 1,
          },
          {
            text: 'Disagree',
            value: 2
          },
          {
            text: 'Neutral',
            value: 3
          },
          {
            text: 'Agree',
            value: 4
          },
          {
            text: 'Strongly Agree',
            value: 5
          }
        ]
      },
      {
        id: 4,
        question: 'I am depressed, blue',
        answers: [
          {
            text: 'Strongly Disagree',
            value: 1,
          },
          {
            text: 'Disagree',
            value: 2
          },
          {
            text: 'Neutral',
            value: 3
          },
          {
            text: 'Agree',
            value: 4
          },
          {
            text: 'Strongly Agree',
            value: 5
          }
        ]
      },
      {
        id: 5,
        question: 'I am original; I come up with my own ideas',
        answers: [
          {
            text: 'Strongly Disagree',
            value: 1,
          },
          {
            text: 'Disagree',
            value: 2
          },
          {
            text: 'Neutral',
            value: 3
          },
          {
            text: 'Agree',
            value: 4
          },
          {
            text: 'Strongly Agree',
            value: 5
          }
        ]
      }
    ];

    return {
      questions: function() {
        deferred.resolve(questions);
        return deferred.promise;
      }
    }

  };

  module.exports = [
    '$q',
    'api',
    'EVENTS',
    ExplorationService
  ];
}());
