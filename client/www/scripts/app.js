/**
 * Created by seanbrookes on 2014-01-28.
 */
var app = angular.module('app', [
  'ui.router',
  'ngResource',
  'Home'
]);
app.run([
  '$http',
  '$templateCache',
  function ($http, $templateCache) {
console.log('Home Run');

    /*
     *
     * pre load the module templates
     *
     * */
    /*
     *
     * Load Dealer Main Template
     *
     * */
//    $http.get('./modules/dealer/templates/dealer.main.html').
//      success(function (res) {
//        $templateCache.put('dealer.main.html', res);
//      }
//    );

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
