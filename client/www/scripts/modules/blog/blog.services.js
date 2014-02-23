/**
 * Created by seanbrookes on 2014-02-16.
 */
Blog.service('BlogService',[
  'Post',
  function(Post){
    "use strict";

    var svc = {api:{}};
    svc.api.Post = Post;
    svc.getRecentPosts = function(){
      var filter = {
        'filter[order]':'lastUpdate DESC'
      };
//      var eventArrayReturnVar = JSON.parse(window.localStorage.getItem('RecentEvents'));
//      if (eventArrayReturnVar){
//        return eventArrayReturnVar;
//      }
      return Post.find(filter,
        function(response){
          window.localStorage.setItem('RecentPosts',JSON.stringify(response));
        },
        function(response){
          console.log('bad get recent posts: ' + JSON.stringify(response));
        }

      );
    };
    svc.createPost = function(postObj,successfn, errorfn){
      console.log('save post - service');
      Post.create(postObj,
        function(response){
          window.localStorage.removeItem('RecentPosts');
          console.log('saved the post');
          if (successfn){
            successfn();
          }
        },
        function(response){
          console.log('bad save new event');
          if(errorfn){
            errorfn();
          }
        }
      );
    };
    svc.updatePost = function(postObj){
      postObj.lastUpdate = Date.now();

      delete postObj._id;
      Post.upsert(postObj,
        function(response){
          console.log('Update the post: ' + JSON.stringify(response));
          //$scope.editMode = false;
          alert('TOAST: success update post');

        },
        function(response){
          console.log('bad update event: ' + JSON.stringify(response));
        }
      );
    };
    svc.deletePost = function(postObj){
      var filter = {
        'id':postObj.id
      };

      delete postObj._id;
      Post.deleteById(filter,
        function(response){
          console.log('delete the post: ' + JSON.stringify(response));
          //$scope.editMode = false;
          alert('TOAST: success update post');

        },
        function(response){
          console.log('bad update event: ' + JSON.stringify(response));
        }
      );
    };

    return svc;

  }

]);