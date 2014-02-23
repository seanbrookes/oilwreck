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
  'Reference',
  'Map',
  'Blog',
  'leaflet-directive',
  'ui.bootstrap',
  'ui.utils',
  'ui.map',
  'angular-medium-editor',
  'ngGrid'
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
      state('dot111', {
        url:'/dot111',
        controller:'DOT111Controller',
        templateUrl:'./scripts/modules/dot111/templates/dot111.home.html'
      }).
      state('reference', {
        url:'/reference',
        controller:'ReferenceMainController',
        templateUrl:'./scripts/modules/reference/templates/reference.links.html'
      }).
      state('admin', {
        url:'/admin',
        controller:'MainAdminController',
        templateUrl:'./scripts/modules/admin/templates/admin.home.html'
      }).
      state('about', {
        url:'/about',
        controller:'AboutController',
        templateUrl:'./scripts/modules/home/templates/about.home.html'
      }).
      state('map', {
        url:'/map',
        controller:'MapHomeController',
        templateUrl:'./scripts/modules/map/templates/map.home.html'
      }).
      state('map1', {
        url:'/map1',
        controller:'EventGMapController',
        templateUrl:'./scripts/modules/event/templates/event.gmap.html'
      }).
      state('blog', {
        url:'/blog',
        controller:'BlogMainController',
        templateUrl:'./scripts/modules/blog/templates/blog.home.html'
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
