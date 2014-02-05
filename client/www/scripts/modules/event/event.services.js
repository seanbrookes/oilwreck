/**
 * Created by seanbrookes on 2014-01-29.
 */
Event.service('EventService',[
  'Event',
  function(Event){
    "use strict";

    var svc = {api:{}};
    svc.api.Event = Event;
    svc.getRecentEvents = function(){
      var filter = {
        'filter[order]':'date DESC'
      };
      return Event.find(filter);
    };

    return svc;

  }

]);