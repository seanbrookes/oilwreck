/**
 * Created by seanbrookes on 2014-01-29.
 */
Event.service('EventService',[
  'Event',
  function(Event){
    "use strict";

    var svc = {};
    svc.Event = Event;

    return svc;

  }

]);