/**
 * Created by seanbrookes on 2014-02-13.
 */
Map.controller('MapHomeController',[
  '$scope',
  '$state',
  'MapService',
  'EventService',
  function($scope, $state, MapService, EventService){
    "use strict";

    var tilesDict = {
      openstreetmap: {
        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      },
      opencyclemap: {
        url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        options: {
          attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
        }
      }
    };

    var rawEventList = EventService.getRecentEvents({},
      function(response){
        console.log('RAW EVENT LIST Callback')

      },
      function(response){
        "use strict";
        console.log('bad get events');
      }
    );
    function getMarkerSlug(item){
      var rawString = item.nearestCity + item.stateProv;
      var retVal = rawString.replace(' ', '');
      var retVal = retVal.replace(' ', '');
      var retVal = retVal.replace(' ', '');
      return retVal;
    }
    $scope.markers = [];
    angular.forEach(rawEventList,function(item){
//      var newGMapPosition = new google.maps.LatLng(item.location.lat, item.location.lng);
//      var map1 = $scope.myMap;
      $scope.markers[getMarkerSlug(item)] = {
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng),
        message: item.nearestCity + ', ' + item.stateProv,
        focus: true,
        draggable: false
      };
      /*   new google.maps.Marker({
       map: $scope.myMap,
       position: newGMapPosition,
       icon: getCircle(item.magnitude),
       title: item.nearestCity + ', ' + item.stateProv,
       description: item.blurb
       })*/

    });
    console.log('Map Home Controller');
    angular.extend($scope, {
      center: {
        lat: 45.784,
        lng: -96.670,
        zoom: 4,
        layers: new L.TileLayer('https://a.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png')
      },
      tiles: tilesDict.openstreetmap,
      defaults: {
        scrollWheelZoom: false
      }
    });

  }
]);