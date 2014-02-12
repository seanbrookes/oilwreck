/**
 * Created by seanbrookes on 2014-01-29.
 *
 * reference: http://stackoverflow.com/questions/8455685/how-to-implement-post-tags-in-mongo
 *
 */
Tag.service('TagService',[
  'Tag',
  function(Tag){
    "use strict";

    var svc = {api:{}};
    svc.api.Tag = Tag;
    // utility for new tag names
    function replaceAll(find, replace, str) {
      return str.replace(new RegExp(find, 'g'), replace);
    }

    svc.getSystemTags = function(){

      if (window.localStorage.getItem('systemTags')){
        return JSON.parse(window.localStorage.getItem('systemTags'));
      }
      return Tag.query({},
        function(response){
          window.localStorage.setItem('systemTags',JSON.stringify(response));
        },
        function(response){
          console.log('bad get system tags: ' + JSON.stringify(response));
        }
      );
    };

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
