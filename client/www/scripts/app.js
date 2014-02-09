/**
 * Created by seanbrookes on 2014-01-28.
 */
var app = angular.module('app', [
  'ui.router',
  'ngResource',
  'lbServices',
  'Home',
  'Tag',
  'Event',
  'ui.bootstrap',
  'ui.utils',
  'ui.map'
]);
app.run([
  '$http',
  '$templateCache',
  function ($http, $templateCache) {


  }
]);
//app.config([
//  '$httpProvider',
//  function ($httpProvider) {
//    $httpProvider.interceptors.push('requestInterceptor');
//  }
//]);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: './scripts/modules/home/templates/home.template.html'
      }).
      state('tags', {
        url:'/tags',
        controller:'TagController',
        templateUrl:'./scripts/modules/tag/templates/tag.input.html'
      }).
      state('eventform', {
        url:'/eventform',
        controller:'EventFormController',
        templateUrl:'./scripts/modules/event/templates/event.form.html'
      }).
      state('editevent', {
        url:'/editevent/:id',
        controller:'EventEditController',
        templateUrl:'./scripts/modules/event/templates/event.form.html'
      }).
      state('admin', {
        url:'/admin',
        controller:'MainAdminController',
        templateUrl:'./scripts/modules/admin/templates/admin.home.html'
      }).
      state('events', {
        url:'/events',
        controller:'EventController',
        templateUrl:'./scripts/modules/event/templates/event.list.html'
      });

  }
]);
app.factory('requestInterceptor', [
  '$q',
  '$rootScope',
  function ($q, $rootScope) {
    return {
      'request': function (config) {
        if (window.localStorage.getItem('accessToken')) {
          config.headers.authorization = window.localStorage.getItem('accessToken');
        }
        // console.log('requestInterceptor [request]config: ', config);
        return config || $q.when(config);
      }
    };
  }
]);
app.controller('AppCtrl', [
  '$scope',
  function ($scope) {
//    $scope.rightButtons = [
//      {
//        type: 'button-positive',
//        content: '<i class="icon ion-navicon"></i>',
//        tap: function (e) {
//        }
//      }
//    ];

    console.log('App Controller');
  }
]);
