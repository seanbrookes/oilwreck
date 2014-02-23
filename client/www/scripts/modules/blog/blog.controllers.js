/**
 * Created by seanbrookes on 2014-02-16.
 */
Blog.controller('BlogMainController',[
  '$scope',
  'BlogService',
  function($scope,BlogService){
    "use strict";

    console.log('Blog Controller');

    var recentPosts = BlogService.getRecentPosts();

    $scope.posts = recentPosts;

    $scope.myData = [
      {name: "Moroni", age: 50},
      {name: "Teancum", age: 43},
      {name: "Jacob", age: 27},
      {name: "Nephi", age: 29},
      {name: "Enos", age: 34}
    ];
    $scope.postGridOptions = {
      data: 'posts',
      columnDefs: [{field:'title', displayName:'Title'}, {field:'lastUpdate', displayName:'Updated'}, {field:'status',displayName:'Status'}]

    };

    var postObj = {};

    $scope.newPost = function(){
      postObj = {};
    };

    $scope.currentPost = postObj;

    $scope.savePost = function(){
      console.log('save post - controller');
      BlogService.createPost($scope.currentPost,
        function(response){
          console.log('saved new post - reload list: ' + JSON.stringify(response));
          recentPosts = BlogService.getRecentPosts();
        },
        function(response){
          console.log('bad save new post: ' + JSON.stringify(response));

        }
      );

    };

    postObj.body = '<p>[add text]</p>';

  }
]);