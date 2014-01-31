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
      saveEventObj.country = $scope.eventObj.country.name;
      saveEventObj.stateProv = $scope.eventObj.stateProv.name;

      console.log('Save Event: ' + JSON.stringify(saveEventObj));

      EventService.Event.create(saveEventObj,
        function(reponse){
          $scope.eventobj = {};
          console.log('saved the event');
        },
        function(response){
          console.log('bad save new event');
        }
      );
//      var newTagObj = {};
//      newTagObj.name = $scope.newTag;
//      newTagObj.slug = TagService.getSlug($scope.newTag);
//      console.log('New Tag Slug: ' + newTagObj.slug);
//      Tag.create(newTagObj,
//        function(response){
//          console.log('success Tag create: ' + JSON.stringify(response));
//        },
//        function(response){
//          console.log('bad Tag create: ' + JSON.stringify(response));
//        });
//      $scope.newTag = '';
//      $scope.tags = Tag.query();
    };
   }

]);