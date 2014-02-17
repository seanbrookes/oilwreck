/**
 * Created by seanbrookes on 2014-01-29.
 */
Tag.controller('TagController',[
  '$scope',
  '$state',
  'Tag',
  'TagService',
  function($scope, $state, Tag, TagService){
    "use strict";

    var tagObj = {};

    $scope.addTag = function(){
      console.log('Add Tag: ' + $scope.newTag);
      var newTagObj = {};
      newTagObj.name = $scope.newTag;
      newTagObj.slug = TagService.getSlug($scope.newTag);
      console.log('New Tag Slug: ' + newTagObj.slug);
      Tag.create(newTagObj,
      function(response){
        console.log('success Tag create: ' + JSON.stringify(response));
        window.localStorage.removeItem('systemTags');
        $scope.tags = Tag.query();
      },
      function(response){
        console.log('bad Tag create: ' + JSON.stringify(response));
      });
      $scope.newTag = '';

    };
    $scope.tags = Tag.query(
      function(response){
        console.log('got tags');
      },
      function(reponse){
        console.log('bat get tags: ' + JSON.stringify(reponse));
      }
    );
  }
]);