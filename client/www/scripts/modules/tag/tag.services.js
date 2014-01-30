/**
 * Created by seanbrookes on 2014-01-29.
 */
Tag.service('TagService',[
  function(){
    "use strict";

    var svc = {};

    // utility for new tag names
    function replaceAll(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    }


    svc.getSlug = function(title){

      var retVal = title;
      if (retVal.indexOf(' ') > -1){
        retVal = replaceAll(' ','-',retVal).toLowerCase();
      }
      if (retVal.indexOf('?') > -1){
        retVal = replaceAll('\\?','-',retVal).toLowerCase();
      }

      return retVal.toLowerCase();
    };

    return svc;

  }
]);