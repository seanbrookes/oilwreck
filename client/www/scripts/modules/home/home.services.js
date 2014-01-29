/**
 * Created by seanbrookes on 2014-01-28.
 */
app.factory('Events', [
  '$resource',
  function ($resource) {
console.log('fuc');
    var Event = $resource('api/events/:id',
      { id: '@id' },
      {
        query: {
          method: 'GET',
          isArray: true,
          headers: { 'X-strongloop-starttime': Date.now().toString() }
        }
      }
    );
    return Event;

  }
]);





/**
 *
 * Home Service
 *
 * */
Home.service('HomeService', [
  '$http',
  '$q',
  '$rootScope',
  'Events',
  function ($http, $q, $rootScope, Events) {
    console.log('fffff');

    return {


      /**
       *
       * Get All Dealers
       *
       * */
      getAllEvents: function () {
        var filter = {
          'filter[limit]': 300
        };
        return Events.query(filter, function (response) {
            console.log('success get all events');
          },
          function (response) {
            console.log('bad get all events ' + response);
          });
      }
    };

  }
]);