/**
 * Created by seanbrookes on 2014-01-28.
 */
Home.controller('HomeController', [
  '$scope',
  '$state',
  'HomeService',
  function ($scope, $state, HomeService) {

    console.log('home');
    $scope.viewTitle = 'Oil Wreck';

    $scope.events = HomeService.getAllEvents();


  }
]);