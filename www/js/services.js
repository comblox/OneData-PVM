angular.module('starter.services', [])

.factory('Projects', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var projects = [
        {
            'name': 'QS3b AR - Elmvale Row Flooding Glasgow',
            'number': 1234512,
            'show': true
        },
        {
            'name': 'QS3b AR - P001 UID In Park at South of Footbridge Kelvingrove Park',
            'number': 4030930000,
            'show': true
        },
        {
            'name': 'QS3b AR - P013 UID At The Junction of Otago Street and Otago Lane North',
            'number': 4031050000,
            'show': true
        },
        {
            'name': 'S150 - UID - Burnfield Cottages Giffnock Overflow',
            'number': 4017880000,
            'show': true
        }
    ];

  return {
    all: function() {
      return projects;
    },
    remove: function(chat) {
      projects.splice(projects.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === parseInt(chatId)) {
          return projects[i];
        }
      }
      return null;
    }
  };
});
