/**
 * Created by seanbrookes on 2014-02-16.
 */
Blog.directive('blogMarkdown',function(){
  "use strict";
  var converter = new Showdown.converter();
  return {
    restrict: 'E',
    controller:function($scope){

      var blog = {};
      blog.body = '';

      $scope.blog = blog;

      $scope.preview = function(){
       // blog.body =
      }

    },
    link: function (scope, element, attrs) {
      var htmlText = converter.makeHtml(element.text());
      element.html(htmlText);
    }
  };
});

