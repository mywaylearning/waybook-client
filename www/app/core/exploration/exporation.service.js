(function() {
  'use strict';

  function ExplorationService($q, api, EVENTS) {

    var svcInterface, Explorations;

    var Explorations = api.all('explorations');
    var Categories = api.all('categories');

    var svcInterface = {
      getCategories: _getCategories,
      collection: _collection,
      getBySlug: _getBySlug
    };

    return svcInterface;

    var explorations = {
      "the-big":
          {
            title: 'The Big 5 Personality Inventory',
            pattern: 'multiple-choice',
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
            ],
            questions: {
              "1": "I am talkative",
              "2": "I tend to find fault with others",
              "3": "I do a thorough job",
              "4": "I am depressed, blue",
              "5": "I am original; I come up with my own ideas"
            }
          },
      "the-duran-values":
        {
          title: 'The Duran Values Interview for High School Students',
          pattern: 'multiple-choice',
          questions: [
            {
              id: 1,
              question: 'The prom this weekend.',
              answers: [
                {
                  text: 'Value 1',
                  value: 1
                },
                {
                  text: 'Value 2',
                  value: 2
                }
              ]
            },
            {
              id: 2,
              question: 'Another one.',
              answers: [
                {
                  text: 'Another answer',
                  value: 1
                },
                {
                  text: 'Another new answer',
                  value: 2
                }
              ]
            }
          ]
        },
        "space":
            {
              title: 'Space',
              pattern: 'heat-map',
              answers: [
                {
                  text: 'I don\'t know',
                  value: 1,
                },
                {
                  text: 'Must have',
                  value: 2
                },
                {
                  text: 'Should have',
                  value: 3
                },
                {
                  text: 'Nice to have',
                  value: 4
                },
                {
                  text: 'Avoid',
                  value: 5
                }
              ],
              questions: {
                "1": "I am talkative",
                "2": "I tend to find fault with others",
                "3": "I do a thorough job",
                "4": "I am depressed, blue",
                "5": "I am original; I come up with my own ideas"
              }
            },
    };

    var categories = [
      {
        id: 1,
        title: 'Personality',
        slug: 'personality',
        explorations: [
          {
            title: 'The Big 5 Personality Inventory',
            description: 'Find out where you fall on each of the dimensions of openness, conscientiousness, extraversion, agreeableness and neuroticism.',
            slug: 'the-big',
            image: 'http://res.cloudinary.com/myway-learning-company/image/upload/w_80,h_80/v1402449348/yyzakjmvpnnxd9sqn6bn.jpg'
          }
        ]
      },
      {
        id: 2,
        title: 'Values and principles',
        slug: 'values-principles',
        explorations: [
          {
            title: 'The Duran Values Interview for High School Students',
            description: 'Life is full of choices. What do you value most?',
            slug: 'the-duran-values',
            image: 'http://res.cloudinary.com/myway-learning-company/image/upload/w_120,h_120/v1402452536/ftcgqwipan5xosbduntm.jpg'
          }
        ]
      },
      {
        id: 3,
        title: 'Career Design',
        slug: 'career-design',
        explorations: [
          {
            title: 'Space',
            description: 'You will ultimately design your career. Space is a design element. With this resource, we explore your vision and desires as they related your place in space as part of your future work. You\'ll create a \'heat map\'. Click on the element once to set it to \'must have\', twice to set it to \'should have\', three times to set it to \'nice to have\' and four times to set it to \'avoid\'. You can reset it to \'I don\'t know\' by clicking on it a fifth time.',
            slug: 'space',
            image: 'http://res.cloudinary.com/myway-learning-company/image/upload/w_120,h_120/v1416678556/yfquzenpr3sshabekfzx.jpg'
          }
        ]
      }
    ];

    function _getCategories() {
      return Categories.getList();
    }

    function _collection() {
      return Explorations.getList();
    }

    function _getBySlug(slug) {
      return api.one('explorations', slug).get();
    };

  };

  module.exports = [
    '$q',
    'api',
    'EVENTS',
    ExplorationService
  ];
}());
