/**
 * Created by seanbrookes on 2014-02-02.
 */
Event.directive('owEventForm',[
  function(){
    "use strict";
    return{
      scope:{
        event:'='
      },
      templateUrl:'./scripts/modules/event/templates/event.form.html',
      require: 'ngModel',
      controller:function($scope){
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

        };
      },
      link:function(scope, element, attrs, ngModel){
       // console.log(scope, element, attrs);
//        console.log(ngModel);
//        console.log(ngModel.$modelValue);
        var render = function(){
          console.log('modelValue:', ngModel.$modelValue);
          scope.eventObj = ngModel.$modelValue;

        };
        scope.$watch(attrs['ngModel'], render);
        render();
      }
    }
  }
]);