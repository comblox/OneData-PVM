angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Projects) {
    $scope.projects = Projects.all();
})

.controller('InspectionReportCtrl', function($scope) {
    
    $scope.questions = [
        {
            title: 'General',
            order: 1,
            questions: [
                {
                    'question': 'Has the TM notice been accepted by the council?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Is signing in accordance with NRSWA?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'Signs',
            order: 1,
            questions: [
                {
                    'question': 'Are all signs in the correct place?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are all signs clean?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Have all damaged signs been removed and replaced?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are all signs secured against being blown over?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Is there an information board displayed?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'Traffic Cones',
            order: 1,
            questions: [
                {
                    'question': 'Are all traffic cones in the correct place?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are all traffic cones clean?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are all traffic cones fitted with a Class 2 reflective sleeve?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Have all damaged cones been removed and replaced?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'ROAD SAFETY LAMPS',
            order: 1,
            questions: [
                {
                    'question': 'Are there sufficient numbers of road safety lamps?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are they working?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are they clean?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'TRAFFIC LIGHTS',
            order: 1,
            questions: [
                {
                    'question': 'Are the traffic lights working correctly?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Is there a STOP/GO board available?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'If the traffic lights are powered by diesel, is the tank full?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'PEDESTRIAN ROUTES',
            order: 1,
            questions: [
                {
                    'question': 'Are pedestrian routes clearly indicated?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Are pedestrian routes free from obstructions?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Does it meet the minimum unobstructed width of 1m?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'If a temporary footway in the road is used, are ramps to the kerbs provided where necessary?',
                    'answer': '',
                    'comment': ''
                }
            ]
        },
        {
            title: 'COMPLETION',
            order: 1,
            questions: [
                {
                    'question': 'Have all signs, cones, barriers & lamps been removed?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Have any covered permanent signs been restored?',
                    'answer': '',
                    'comment': ''
                },
                {
                    'question': 'Have the authorities been told the work is completed?',
                    'answer': '',
                    'comment': ''
                }
            ]
        }
    ]
})

.controller('AccountCtrl', function($scope, Projects) {
    $scope.projects = Projects.all();
});
