function WatsonController($scope) {
  'ngInject';

  $scope.obj = {
    'id': '*UNKNOWN*',
    'source': '*UNKNOWN*',
    'word_count': 6567,
    'processed_lang': 'en',
    'tree': {
      'id': 'r',
      'name': 'root',
      'children': [{
        'id': 'personality',
        'name': 'Big 5',
        'children': [{
          'id': 'Openness_parent',
          'name': 'Abertura',
          'category': 'personality',
          'percentage': 0.9631891745614539,
          'children': [{
            'id': 'Openness',
            'name': 'Abertura',
            'category': 'personality',
            'percentage': 0.9631891745614539,
            'sampling_error': 0.050539783320000004,
            'children': [{
              'id': 'Adventurousness',
              'name': 'Desejo de aventura',
              'category': 'personality',
              'percentage': 0.9029180599576121,
              'sampling_error': 0.0446483246
            }, {
              'id': 'Artistic interests',
              'name': 'Interesses artísticos',
              'category': 'personality',
              'percentage': 0.6229807684415617,
              'sampling_error': 0.09143243076
            }, {
              'id': 'Emotionality',
              'name': 'Emotividade',
              'category': 'personality',
              'percentage': 0.1965764044257351,
              'sampling_error': 0.041509238239999996
            }, {
              'id': 'Imagination',
              'name': 'Imaginação',
              'category': 'personality',
              'percentage': 0.9153740641312289,
              'sampling_error': 0.05539290224
            }, {
              'id': 'Intellect',
              'name': 'Intelecto',
              'category': 'personality',
              'percentage': 0.9632763204304002,
              'sampling_error': 0.04811379516
            }, {
              'id': 'Liberalism',
              'name': 'Desafio à autoridade',
              'category': 'personality',
              'percentage': 0.8995658746895043,
              'sampling_error': 0.07415698244
            }]
          }, {
            'id': 'Conscientiousness',
            'name': 'Escrupulosidade',
            'category': 'personality',
            'percentage': 0.793722669085965,
            'sampling_error': 0.06415381428,
            'children': [{
              'id': 'Achievement striving',
              'name': 'Esforço para realização',
              'category': 'personality',
              'percentage': 0.7726796726670777,
              'sampling_error': 0.08709414136
            }, {
              'id': 'Cautiousness',
              'name': 'Cautela',
              'category': 'personality',
              'percentage': 0.9074823778428784,
              'sampling_error': 0.08097883472
            }, {
              'id': 'Dutifulness',
              'name': 'Respeito',
              'category': 'personality',
              'percentage': 0.4220437547014437,
              'sampling_error': 0.053445923879999996
            }, {
              'id': 'Orderliness',
              'name': 'Regularidade',
              'category': 'personality',
              'percentage': 0.1823140480466555,
              'sampling_error': 0.06150413528
            }, {
              'id': 'Self-discipline',
              'name': 'Autodisciplina',
              'category': 'personality',
              'percentage': 0.4905581485566533,
              'sampling_error': 0.04180903724
            }, {
              'id': 'Self-efficacy',
              'name': 'Autoeficiência',
              'category': 'personality',
              'percentage': 0.9200547838774253,
              'sampling_error': 0.080130726
            }]
          }, {
            'id': 'Extraversion',
            'name': 'Extroversão',
            'category': 'personality',
            'percentage': 0.20436972703400527,
            'sampling_error': 0.0484735006,
            'children': [{
              'id': 'Activity level',
              'name': 'Nível de atividade',
              'category': 'personality',
              'percentage': 0.346528248570709,
              'sampling_error': 0.06732568748000001
            }, {
              'id': 'Assertiveness',
              'name': 'Assertividade',
              'category': 'personality',
              'percentage': 0.197959164436086,
              'sampling_error': 0.07158898116
            }, {
              'id': 'Cheerfulness',
              'name': 'Bom Humor',
              'category': 'personality',
              'percentage': 0.117251542948445,
              'sampling_error': 0.08991412396000001
            }, {
              'id': 'Excitement-seeking',
              'name': 'Busca de Empolgação',
              'category': 'personality',
              'percentage': 0.028545486877968772,
              'sampling_error': 0.07369112988
            }, {
              'id': 'Friendliness',
              'name': 'Extrovertido',
              'category': 'personality',
              'percentage': 0.4361224515546898,
              'sampling_error': 0.06625031787999999
            }, {
              'id': 'Gregariousness',
              'name': 'Gregarismo',
              'category': 'personality',
              'percentage': 0.08198441053609605,
              'sampling_error': 0.051363121920000004
            }]
          }, {
            'id': 'Agreeableness',
            'name': 'Amabilidade',
            'category': 'personality',
            'percentage': 0.2899671715264805,
            'sampling_error': 0.08603307756,
            'children': [{
              'id': 'Altruism',
              'name': 'Altruísmo',
              'category': 'personality',
              'percentage': 0.7429410401889878,
              'sampling_error': 0.0616541538
            }, {
              'id': 'Cooperation',
              'name': 'Cooperação',
              'category': 'personality',
              'percentage': 0.7086448179619843,
              'sampling_error': 0.07161640547999999
            }, {
              'id': 'Modesty',
              'name': 'Modéstia',
              'category': 'personality',
              'percentage': 0.05336868951120819,
              'sampling_error': 0.0473669698
            }, {
              'id': 'Morality',
              'name': 'Determinação',
              'category': 'personality',
              'percentage': 0.25084836837865376,
              'sampling_error': 0.05504608852
            }, {
              'id': 'Sympathy',
              'name': 'Simpatia',
              'category': 'personality',
              'percentage': 0.9841075682731257,
              'sampling_error': 0.0855590924
            }, {
              'id': 'Trust',
              'name': 'Confiança',
              'category': 'personality',
              'percentage': 0.4588960841599364,
              'sampling_error': 0.0480864144
            }]
          }, {
            'id': 'Neuroticism',
            'name': 'Faixa emocional',
            'category': 'personality',
            'percentage': 0.260183368079472,
            'sampling_error': 0.07824525624,
            'children': [{
              'id': 'Anger',
              'name': 'Furioso',
              'category': 'personality',
              'percentage': 0.3149243877094119,
              'sampling_error': 0.082253364
            }, {
              'id': 'Anxiety',
              'name': 'Propenso a se preocupar',
              'category': 'personality',
              'percentage': 0.17486596466123674,
              'sampling_error': 0.047139490080000006
            }, {
              'id': 'Depression',
              'name': 'Melancolia',
              'category': 'personality',
              'percentage': 0.13255035357859915,
              'sampling_error': 0.04916042476
            }, {
              'id': 'Immoderation',
              'name': 'Imoderação',
              'category': 'personality',
              'percentage': 0.020540652294639385,
              'sampling_error': 0.04643391396
            }, {
              'id': 'Self-consciousness',
              'name': 'Autoconsciência',
              'category': 'personality',
              'percentage': 0.05856486204716033,
              'sampling_error': 0.04829766116
            }, {
              'id': 'Vulnerability',
              'name': 'Suscetível ao stress',
              'category': 'personality',
              'percentage': 0.10899218059412821,
              'sampling_error': 0.07380010616
            }]
          }]
        }]
      }, {
        'id': 'needs',
        'name': 'Necessidades',
        'children': [{
          'id': 'Challenge_parent',
          'name': 'Desafio',
          'category': 'needs',
          'percentage': 0.8573624766312108,
          'children': [{
            'id': 'Challenge',
            'name': 'Desafio',
            'category': 'needs',
            'percentage': 0.8573624766312108,
            'sampling_error': 0.07247685872
          }, {
            'id': 'Closeness',
            'name': 'Retraimento',
            'category': 'needs',
            'percentage': 0.32018595829834323,
            'sampling_error': 0.07183077516
          }, {
            'id': 'Curiosity',
            'name': 'Curiosidade',
            'category': 'needs',
            'percentage': 0.2475242466727579,
            'sampling_error': 0.10147671899999999
          }, {
            'id': 'Excitement',
            'name': 'Empolgação',
            'category': 'needs',
            'percentage': 0.2115914159110306,
            'sampling_error': 0.0914143236
          }, {
            'id': 'Harmony',
            'name': 'Harmonia',
            'category': 'needs',
            'percentage': 0.3718335595876257,
            'sampling_error': 0.09109930044
          }, {
            'id': 'Ideal',
            'name': 'Ideal',
            'category': 'needs',
            'percentage': 0.2909117510169979,
            'sampling_error': 0.08270395336
          }, {
            'id': 'Liberty',
            'name': 'Liberdade',
            'category': 'needs',
            'percentage': 0.2243180003451146,
            'sampling_error': 0.12361126224
          }, {
            'id': 'Love',
            'name': 'Amor',
            'category': 'needs',
            'percentage': 0.44385290177097103,
            'sampling_error': 0.08342828824
          }, {
            'id': 'Practicality',
            'name': 'Natureza prática',
            'category': 'needs',
            'percentage': 0.3116085205169126,
            'sampling_error': 0.07383529028
          }, {
            'id': 'Self-expression',
            'name': 'Expressão da própria personalidade',
            'category': 'needs',
            'percentage': 0.23427905179355896,
            'sampling_error': 0.07087937516000001
          }, {
            'id': 'Stability',
            'name': 'Estabilidade',
            'category': 'needs',
            'percentage': 0.4678983932149078,
            'sampling_error': 0.09041347032
          }, {
            'id': 'Structure',
            'name': 'Estrutura',
            'category': 'needs',
            'percentage': 0.4948309105912549,
            'sampling_error': 0.06854961512
          }]
        }]
      }, {
        'id': 'values',
        'name': 'Valores',
        'children': [{
          'id': 'Self-transcendence_parent',
          'name': 'Autotranscendência',
          'category': 'values',
          'percentage': 1,
          'children': [{
            'id': 'Conservation',
            'name': 'Conservação',
            'category': 'values',
            'percentage': 0.009867081070733346,
            'sampling_error': 0.0627080972
          }, {
            'id': 'Openness to change',
            'name': 'Abertura à mudança',
            'category': 'values',
            'percentage': 0.972027552445952,
            'sampling_error': 0.056708103520000004
          }, {
            'id': 'Hedonism',
            'name': 'Hedonismo',
            'category': 'values',
            'percentage': 0.09287824025169457,
            'sampling_error': 0.11362771944
          }, {
            'id': 'Self-enhancement',
            'name': 'Autocrescimento',
            'category': 'values',
            'percentage': 0.21588873696351785,
            'sampling_error': 0.08690135832
          }, {
            'id': 'Self-transcendence',
            'name': 'Autotranscendência',
            'category': 'values',
            'percentage': 1,
            'sampling_error': 0.0655177128
          }]
        }]
      }]
    }
  };
}

module.exports = WatsonController;
