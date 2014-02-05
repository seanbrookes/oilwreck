/**
 * Created by seanbrookes on 2014-01-29.
 */

Event.controller('EventController',[
  '$scope',
  '$state',
  'EventService',
  function($scope, $state, EventService){
    "use strict";

    $scope.events = EventService.getRecentEvents();
    $scope.sort = function(item) {
      if (this.predicate == 'date') {
        return new Date(item.date);
      }
      return item[this.predicate];
    };

    $scope.deleteEvent = function(event){
      console.log('delete event: ' + JSON.stringify(event));
      EventService.api.Event.delete(event,
        function(response){
          console.log('success delete object: ' + JSON.stringify(response));
        },
        function(response){
          console.log('bad delete object: ' + JSON.stringify(response));
        }
      );
    };

    $scope.reverse = false;

    $scope.editEvent = function(event){
      console.log(JSON.stringify(event));
      $state.go('/editevent/' + event._id);
    };



  }
]);
Event.controller('EventFormController',[
  '$scope',
  '$state',
  'EventService',
  function($scope, $state, EventService){
    "use strict";
    console.log('Event Form Controller');

    $scope.provStates = window.provStates;
    $scope.countries = [
      {
        name:'Canada'
      },
      {
        name:'United States'
      },
      {
        name:'Mexico'
      }
    ];

    $scope.getMatchProvStates = function(type){
      console.log('entered: ' + type);
    }


    $scope.eventObj = {};
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];




    /*
    *
    * Save Event Form
    *
    * */
    $scope.saveEvent = function(){


      var saveEventObj = $scope.eventObj;
//      saveEventObj.country = $scope.eventObj.country.name;
//      saveEventObj.stateProv = $scope.eventObj.stateProv.name;

      console.log('Save Event: ' + JSON.stringify(saveEventObj));

      EventService.api.Event.create(saveEventObj,
        function(reponse){
          $scope.eventobj = {};
          console.log('saved the event');
        },
        function(response){
          console.log('bad save new event');
        }
      );

    };
   }

]);
Event.controller('EventEditController',[
  '$scope',
  function($scope){
    "use strict";
    console.log('EDIT EVENT');
  }
]);