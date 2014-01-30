/**
 * Created by seanbrookes on 2014-01-29.
 */

Event.controller('EventController',[
  '$scope',
  '$state',
  'Event',
  function($scope, $state, Event){
    "use strict";

    $scope.events = Event.query();
  }
]);
Event.controller('EventFormController',[
  '$scope',
  '$state',
  'EventService',
  function($scope,
    $state,
    EventService){
    "use strict";
    console.log('Event Form Controller');
    $scope.eventObj = {};
  }

]);